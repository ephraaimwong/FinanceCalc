//since chart.js was called in HTML via CDN, we need to either 1) download chart.js locally and import into this test file or 2)create a Jest mockup of chart.js
global.Chart = jest.fn().mockImplementation(() => {
    return {
        destroy: jest.fn(),
        update: jest.fn(),
    };
});

const {validate, overview,breakDown,evalAmort} = require('./amortization');


//mock HTML values that reset before each test runs
beforeEach(() => {
    document.getElementsByName = jest.fn((name) => {
        switch(name){
            case"principal": return[{value:"100000"}];
            case"down": return[{value:"20000"}];
            case"interest": return[{value:"5"}];
            case"term": return[{value:"360"}];
            default:return[{value:"0"}];
        }
        
    });
});

document.getElementById = jest.fn((id)=>{
    if (id === "amortChart") {
        return{
            //return mock call of getContext
            getContext: jest.fn(() => ({
                //mock context methods for Chart.js
                canvas: {} 
            })),
        };
        return{innerHTML:"", value:""}
    }
})

describe("validate function", () => {
    test('should return false for NULL', () => {
        expect(validate(null)).toBe(false); //call function on null
    });
    test('should return false for empty string', () => {
        expect(validate("")).toBe(false); //call function on empty string
    });
    test('should return false for negative int', () => {
        expect(validate(-100)).toBe(false); //call function on neg int
    });
    test('should return false for negative float', () => {
        expect(validate(-100.01)).toBe(false); //call function on neg float
    });
    
    test('should return true for positive int', () => {
        expect(validate(100)).toBe(true); //call function on positive int
    });
    test('should return true for positive float', () => {
        expect(validate(100.01)).toBe(true); // call function on positive float
    });
});

describe('overview function', () => {
    test('should return correct HTML table for "loan details"', () => {
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
    test('should correctly generate amortization schedule & chart.js', () => {
        //local var pulls values from document mock object 
        var principal = document.getElementsByName("principal")[0].value - document.getElementsByName("down")[0].value; //principal for this function refers to total - downpayment
        var interestRate = document.getElementsByName("interest")[0].value / 100;
        var numPayments = document.getElementsByName("term")[0].value;
        const result = evalAmort(principal, interestRate, numPayments); //draw chart is called in evalAmort function if chart is not successful, evalAmort fails, therefore this unit test tests both at once.
        //test row 1
        expect(result).toContain("<td>1</td>");//row1col1
        expect(result).toContain("$80,000");//row1col2
        expect(result).toContain("$333.33");//row1col3
        expect(result).toContain("$96.12");//row1col4
        //test row 72
        expect(result).toContain("<td>72</td>");//row72col1
        expect(result).toContain("$72,077.38");//row72col2
        expect(result).toContain("$300.32");//row72col3
        expect(result).toContain("$129.13");//row72col4
        //test row 360
        expect(result).toContain("<td>360</td>");//row360col1
        expect(result).toContain("$427.68");//row360col2
        expect(result).toContain("$1.78");//row360col3
        expect(result).toContain("$427.68");//rowcol4
    });
});