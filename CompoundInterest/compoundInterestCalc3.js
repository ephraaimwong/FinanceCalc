// Compound Interest Calculation
function calculateCompoundInterest(principal, rate, time, timePeriod, compounds) {
  // Adjust time for months or days
  if (timePeriod === 'months') time /= 12;
  if (timePeriod === 'days') time /= 365;

  // Compound interest formula
  const totalAmount = principal * Math.pow(1 + rate / (compounds * 100), compounds * time);
  const interestEarned = totalAmount - principal;

  return { totalAmount, interestEarned };
}

// Loan Payment Calculation
function calculateLoanPayment(principal, rate, years) {
  const monthlyRate = rate / 100 / 12; // Convert annual rate to monthly rate
  const totalMonths = years * 12; // Total months of the loan term

  // Loan payment formula (annuity formula)
  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - principal;

  return { monthlyPayment, totalPayment, totalInterest };
}

// Function to handle mode switching and perform appropriate calculation
function calculate() {
  const isLoanMode = document.getElementById('mode-switch').checked;

  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const time = parseFloat(document.getElementById('time').value);
  const timePeriod = document.getElementById('time-period').value;
  const compounds = parseFloat(document.getElementById('compounds').value);

  if (isLoanMode) {
    // Loan Payment Mode
    const result = calculateLoanPayment(principal, rate, time);
    document.getElementById('result').innerHTML = `
      <p>Monthly Payment: $${result.monthlyPayment.toFixed(2)}</p>
      <p>Total Payment: $${result.totalPayment.toFixed(2)}</p>
      <p>Total Interest: $${result.totalInterest.toFixed(2)}</p>`;
  } else {
    // Compound Interest Mode
    const result = calculateCompoundInterest(principal, rate, time, timePeriod, compounds);
    document.getElementById('result').innerHTML = `
      <p>Total Amount: $${result.totalAmount.toFixed(2)}</p>
      <p>Interest Earned: $${result.interestEarned.toFixed(2)}</p>`;
  }

  // Display the result table
  document.querySelector('.scheduleTable').style.display = 'block';
}

// Export functions for Jest testing
module.exports = { calculateCompoundInterest, calculateLoanPayment };

