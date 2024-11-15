/* Jarrett Covington, CS 3203 Software Engineering
The purpose of this program is to test the Financial 
Calculator through compound interest and loan payment 
through jest and jsdom test environment */

const { calculateCompoundInterest, calculateLoanPayment } = require('./compoundInterestCalc3');

// Helper function for floating-point comparison to avoid precision issues
const roundTo = (num, places) => Number(num.toFixed(places));

describe('Compound Interest Calculator', () => {
  test('Calculates compound interest correctly for annual compounding', () => {
    const result = calculateCompoundInterest(1000, 5, 10, 'years', 1); // Principal: $1000, Rate: 5%, Time: 10 years, 1 compound/year
    expect(roundTo(result.totalAmount, 2)).toBe(1628.89); // Expected total amount after 10 years
    expect(roundTo(result.interestEarned, 2)).toBe(628.89); // Expected interest earned
  });

  test('Calculates compound interest correctly for monthly compounding', () => {
    const result = calculateCompoundInterest(2000, 4, 24, 'months', 12); // Principal: $2000, Rate: 4%, Time: 24 months, 12 compounds/year
    expect(roundTo(result.totalAmount, 2)).toBe(2166.29);
    expect(roundTo(result.interestEarned, 2)).toBe(166.29);
  });

  test('Calculates compound interest correctly for daily compounding', () => {
    const result = calculateCompoundInterest(1500, 3, 365, 'days', 365); // Principal: $1500, Rate: 3%, Time: 1 year, 365 compounds/year
    expect(roundTo(result.totalAmount, 2)).toBe(1545.68);
    expect(roundTo(result.interestEarned, 2)).toBe(45.68);
  });
});

describe('Loan Payment Calculator', () => {
  test('calculates loan monthly payment correctly', () => {
    const result = calculateLoanPayment(5000, 5, 3); // Principal: $5000, Rate: 5%, Loan Term: 3 years
    expect(roundTo(result.monthlyPayment, 2)).toBe(149.85); // Expected monthly payment
  });

  test('Calculates total loan payment and interest correctly', () => {
    const result = calculateLoanPayment(5000, 5, 3); // Principal: $5000, Rate: 5%, Loan Term: 3 years
    expect(roundTo(result.totalPayment, 2)).toBe(5394.76); // Expected total payment
    expect(roundTo(result.totalInterest, 2)).toBe(394.76); // Expected interest over the loan term
  });
});
