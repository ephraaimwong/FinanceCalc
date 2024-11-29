

const {validate, overview,breakDown,evalAmort} = require('./amortization');

//
// global.document = {
//     getElementsByName: jest.fn().mockReturnValue([{value:10000}]),
//     getElementsById: jest.fn().mockReturnValue({innerHTML: ""}),
// };

//mock HTML values that reset before each test runs
beforeEach(() => {
    document.getElementsByName = jest.fn((name) => {
        switch(name){
            case"principal": console.log("mocking principal");return[{value:"100000"}];
            case"down": console.log("mocking down");return[{value:"20000"}];
            case"interest": console.log("mocking interest");return[{value:"5"}];
            case"term": console.log("mocking term");return[{value:"360"}];
            default:return[{value:"0"}];
        }
        
    });
});

describe("validate function", () => {
    test('should return false for NULL, empty values, neg values', () => {
        expect(validate(null)).toBe(false); //call function on null
        expect(validate("")).toBe(false); //call function on empty string
        expect(validate(-100)).toBe(false); //call function on neg int
        expect(validate(-100.01)).toBe(false); //call function on neg float
    });

    test('should return true for positive values', () => {
        expect(validate(100)).toBe(true); //call function on positive int
        expect(validate(100.01)).toBe(true); // call function on positive float
    });
});

describe('overview function', () => {
    test('should return correct HTML table for loan details', () => {
        var principal = document.getElementsByName("principal")[0].value - document.getElementsByName("down")[0].value; //principal for this function refers to total - downpayment;
        var interestRate = document.getElementsByName("interest")[0].value / 100;
        var numPayments = document.getElementsByName("term")[0].value;
        const result = overview(principal,interestRate,numPayments); //call function on mock values
        expect(result).toContain("$80,000.00");
        expect(result).toContain("$20,000.00");
        expect(result).toContain("360");
    });
});
describe('breakDown function', () => {
    test('should return the correct monthly payment, total interest, total paid', () => {
        //local var pulls values from document mock object 
        var principal = document.getElementsByName("principal")[0].value - document.getElementsByName("down")[0].value; //principal for this function refers to total - downpayment
        var interestRate = document.getElementsByName("interest")[0].value / 100;
        var numPayments = document.getElementsByName("term")[0].value;
        const result = breakDown(principal, interestRate, numPayments);
        expect(result).toContain("Monthly Payment:");
        expect(result).toContain("$429.46");
        expect(result).toContain("Total Interest Paid:");
        expect(result).toContain("$74,604.63");
        expect(result).toContain("Total Paid:");
        expect(result).toContain("$154,604.63");
    });
});
describe('evalAmort Function', () => {
    test('should correctly generate amortization schedule', () => {
        const principal = 80000;
        const interestRate = 0.05;
        const numPayments = 360;
        const result = evalAmort(principal, interestRate, numPayments);
        //test row 1
        expect(result).toContain("<td>1</td>");
        expect(result).toContain("$80,000");
        expect(result).toContain("$333.23");
        expect(result).toContain("$96.12");
        //test row 72
        expect(result).toContain("<td>72</td>");
        expect(result).toContain("$72,077.38");
        expect(result).toContain("$300.32");
        expect(result).toContain("$129.13");
        //test row 360
        expect(result).toContain("<td>360</td>");
        expect(result).toContain("$427.68");
        expect(result).toContain("$1.78");
        expect(result).toContain("$427.68");
    });
});