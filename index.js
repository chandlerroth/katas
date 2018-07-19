// Public Functions

function driver(data) {
    const firstName = data[0];
    const middleName = data[1];
    const lastName = data[2];
    const birthday = data[3];
    const gender = data[4];
    return encodeLastName(lastName) + encodeDate(birthday, gender) + encodeInitials(firstName, middleName) + encodeCheckDigits();
}

function encodeLastName(lastName) {
    const formattedLength = 5;
    if (lastName.length < formattedLength)
        lastName += '9'.repeat(formattedLength - lastName.length);
    return lastName.substring(0, formattedLength).toUpperCase();
}

function encodeDate(date, gender) {
    const birthday = new Date(date);
    const decadeDigit = birthday.getFullYear().toString().substring(2, 3);
    const yearDigit = birthday.getFullYear().toString().substring(3, 4);
    const monthDigits = formatMonthDigits(birthday.getMonth()+1, gender);
    const dateDigits = padNumberWithZero(birthday.getDate());
    return decadeDigit + monthDigits + dateDigits + yearDigit;
}

function encodeInitials(firstName, middleName) {
    return firstName[0].toUpperCase() + (middleName ? middleName[0].toUpperCase() : 9);
}

function encodeCheckDigits() {
    return '9AA';
}

// Private Functions

function formatMonthDigits(monthDigits, gender) {
    if (gender === 'F') monthDigits = (50 + monthDigits).toString();
    monthDigits = padNumberWithZero(monthDigits);
    return monthDigits;
}

function padNumberWithZero(number) {
    if (number < 10) number = '0' + number.toString();
    return number;
}

module.exports = {
    encodeLastName: encodeLastName,
    encodeDate: encodeDate,
    encodeInitials: encodeInitials,
    encodeCheckDigits: encodeCheckDigits,
    driver: driver
}