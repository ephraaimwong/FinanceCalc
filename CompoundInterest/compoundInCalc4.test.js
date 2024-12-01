// Author: Jarrett Covington, Date: 30 Nov 2024, Compound Interest Calculator Test file
// The purpose of this file is to generate the unit test to make sure
// the program is performing appropriately in jest environment, using
// the terminal command npm test to perform.

//import { calculateCompoundInterest, calculateLoanPayment } from './compoundInCalc4';
const { calculateCompoundInterest, calculateLoanPayment, sanitizeHTML } = require('./compoundInCalc4');


// Mock DOMPurify and preserve its actual functionality
jest.mock('dompurify', () => {
  const actualDOMPurify = jest.requireActual('dompurify'); // Get the actual DOMPurify
  return {
    ...actualDOMPurify,
    sanitize: jest.fn(actualDOMPurify.sanitize), // Mock sanitize but call actual implementation
  };
});

// Helper function for floating-point comparison to avoid precision issues
const roundTo = (num, places) => Number(num.toFixed(places));

describe('Compound Interest Calculator', () => {
  test('Calculates compound interest correctly for annual compounding', () => {
    //const { calculateCompoundInterest } = require('./compoundInCalc4');
    const result = calculateCompoundInterest(1000, 5, 10, 'years', 1); // Principal: $1000, Rate: 5%, Time: 10 years, 1 compound/year
    expect(roundTo(result.totalAmount, 2)).toBe(1628.89); // Expected total amount after 10 years
    expect(roundTo(result.interestEarned, 2)).toBe(628.89); // Expected interest earned
  });

  test('Calculates compound interest correctly for monthly compounding', () => {
    //const { calculateCompoundInterest } = require('./compoundInCalc4');
    const result = calculateCompoundInterest(2000, 4, 24, 'months', 12); // Principal: $2000, Rate: 4%, Time: 24 months, 12 compounds/year
    expect(roundTo(result.totalAmount, 2)).toBe(2166.29);
    expect(roundTo(result.interestEarned, 2)).toBe(166.29);
  });
});

describe('Loan Payment Calculator', () => {
  test('Calculates loan monthly payment correctly', () => {
    //const { calculateLoanPayment } = require('./compoundInCalc4');
    const result = calculateLoanPayment(5000, 5, 3); // Principal: $5000, Rate: 5%, Loan Term: 3 years
    expect(roundTo(result.monthlyPayment, 2)).toBe(149.85); // Expected monthly payment
  });

  test('Calculates total loan payment and interest correctly', () => {
    //const { calculateLoanPayment } = require('./compoundInCalc4');
    const result = calculateLoanPayment(5000, 5, 3); // Principal: $5000, Rate: 5%, Loan Term: 3 years
    expect(roundTo(result.totalPayment, 2)).toBe(5394.76); // Expected total payment
    expect(roundTo(result.totalInterest, 2)).toBe(394.76); // Expected interest over the loan term
  });
});