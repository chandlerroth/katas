const DriversLicense = require('./index');

describe('encodeLastName()', () => {
    it('should return lastName trimmed to 5 characters and capitalized', () => {
        let lastName = 'Smithology';
        expect(DriversLicense.encodeLastName(lastName)).toEqual('SMITH');
    });

    it('should return lastName padded with 9s when lastName is shorter than 5 charcters', () => {
        let lastName = 'Lee';
        expect(DriversLicense.encodeLastName(lastName)).toEqual('LEE99');
    });

    it('should return capitalized lastName when exactly 5 characters long', () => {
        let lastName = 'Allen';
        expect(DriversLicense.encodeLastName(lastName)).toEqual('ALLEN');
    });
});

describe('encodeDate()', () => {
    it('encoded digit 1 should return the decade number of the birth year', () => {
        let birthday = '01-Jan-1975';
        let encodedDigit = DriversLicense.encodeDate(birthday).substring(0, 1);

        expect(encodedDigit).toEqual('7');
    });

    it('encoded digits 2-3 should return the month of birth', () => {
        let birthday = '01-Jan-1975';
        let encodedDigits = DriversLicense.encodeDate(birthday).substring(1, 3);

        expect(encodedDigits).toEqual('01');
    });

    it('encoded digits 2-3 should be incremented by 50, when gender is female', () => {
        let birthday = '23-Dec-2000';
        let gender = 'F';
        let encodedDigits = DriversLicense.encodeDate(birthday, gender).substring(1, 3);

        expect(encodedDigits).toEqual('62');
    });

    it('encoded digits 4-5 should return the date of birth', () => {
        let birthday = '23-Dec-2000';
        let encodedDigits = DriversLicense.encodeDate(birthday).substring(3, 5);

        expect(encodedDigits).toEqual('23');
    });

    it('encoded digit 6 should return last number of the birth year', () => {
        let birthday = '23-Dec-1987';
        let encodedDigits = DriversLicense.encodeDate(birthday).substring(5, 6);

        expect(encodedDigits).toEqual('7');
    });
});

describe('encodeInitials()', () => {
    it('should return the capitalized first two initials of the first and middle name', () => {
        let firstName = 'William';
        let middleName = 'Chandler';

        expect(DriversLicense.encodeInitials(firstName, middleName)).toEqual('WC');
    });

    it('should return the capitalized first name followed by a "9" when there is no middle name', () => {
        let firstName = 'Sam';
        let middleName = '';

        expect(DriversLicense.encodeInitials(firstName, middleName)).toEqual('S9');
    });
});

describe('encodeCheckDigits()', () => {
    it('should return some hardcoded check digits', () => {
        let checkDigits = '9AA';

        expect(DriversLicense.encodeCheckDigits()).toEqual(checkDigits)
    })
});

describe('it should pass CodeWars tests', () => {
    it('should return a generated license number SMITH001010JJ9AA', () => {
        let data = ['John','James','Smith','01-Jan-2000','M'];
        expect(DriversLicense.driver(data)).toEqual('SMITH001010JJ9AA');
    });

    it('should return a generated license number GIBBS862131J99AA', () => {
        let data = ['Johanna','','Gibbs','13-Dec-1981','F'];
        expect(DriversLicense.driver(data)).toEqual('GIBBS862131J99AA');
    });

    it('should return a generated license number LEE99809021AR9AA', () => {
        let data = ['Andrew','Robert','Lee','02-September-1981','M'];
        expect(DriversLicense.driver(data)).toEqual('LEE99809021AR9AA');
    });
});