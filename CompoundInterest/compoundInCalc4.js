// Author: Jarrett Covington, Compound Interest Calculator .js file
// the purpose of this program is to perform the calculation for either
// compound interest or loan payment based on user input. The .js file is
// called on by the compoundInCalc4.html file

// Wrapper for DOMPurify to allow mocking in tests
function sanitizeHTML(content) {
  const doc = new DOMParser().parseFromString(content, 'text/html');
  return doc.body.textContent || "";
}
  
  // Function to calculate user inputs, will switch between loan and compound interest based on toggle switch from user
function calculate() {
  const isLoanMode = document.getElementById('mode-switch').checked;
  const inputs = getUserInputs();
  
  // Validate inputs
  if (!validateInputs(inputs, isLoanMode)) {
    alert('Please provide valid input values.');
    return;
  }
  
  // Calculate and display results
  if (isLoanMode) {
    displayLoanResults(inputs);
  } else {
    displayCompoundInterestResults(inputs);
  }
  
  // Show the results table
  document.querySelector('.scheduleTable').classList.remove('hidden');
}
  
  // function to get user inputs for calculation compound interest or loan payment
function getUserInputs() {
  return {
    principal: parseFloat(document.getElementById('principal').value),
    rate: parseFloat(document.getElementById('rate').value),
    time: parseFloat(document.getElementById('time').value),
    timePeriod: document.getElementById('time-period').value,
    compounds: parseFloat(document.getElementById('compounds').value),
  };
}
  
// function to validate inputs and ensure that user can only input positive numbers
function validateInputs(inputs, isLoanMode) {
  const errors = [];
  
  if (isNaN(inputs.principal) || inputs.principal <= 0) {
    errors.push('Principal must be a positive number.');
  }
  if (isNaN(inputs.rate) || inputs.rate <= 0) {
    errors.push('Interest rate must be a positive number.');
  }
  if (isNaN(inputs.time) || inputs.time <= 0) {
    errors.push('Time must be a positive number.');
  }
  if (isLoanMode && (isNaN(inputs.compounds) || inputs.compounds <= 0)) {
    errors.push('Compounds per year must be a positive number.');
  }
  
  // if statement for if user does not input any numbers
  const errorMessageElement = document.getElementById('error-message');
  if (errors.length > 0) {
    errorMessageElement.innerHTML = errors.join('<br>');
    errorMessageElement.style.display = 'block';
    return false;
  }
  
  errorMessageElement.style.display = 'none';
  return true;
}
  
// Function for calculating compound interest based on months or days
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
  
// Function to display loan results after called from calculate loan payment function
function displayLoanResults({ principal, rate, time }) {
  const result = calculateLoanPayment(principal, rate, time);
  const safeContent = sanitizeHTML(`
    <p>Minimum Monthly Payment: $${result.monthlyPayment.toFixed(2)}</p>
    <p>Total Payment: $${result.totalPayment.toFixed(2)}</p>
    <p>Total Interest: $${result.totalInterest.toFixed(2)}</p>
  `);
  
  document.getElementById('result').innerHTML = safeContent;
  document.querySelector('.scheduleTable').style.display = 'block';
}
  
// Function to diplay compound interest results after being called upon by calculate compound interest
function displayCompoundInterestResults({ principal, rate, time, timePeriod, compounds }) {
  const result = calculateCompoundInterest(principal, rate, time, timePeriod, compounds);
  const safeContent = sanitizeHTML(`
    <p>Total Amount: $${result.totalAmount.toFixed(2)}</p>
    <p>Interest Earned: $${result.interestEarned.toFixed(2)}</p>
  `);
  
  document.getElementById('result').innerHTML = safeContent;
  document.querySelector('.scheduleTable').style.display = 'block';
}
  
// "Calculate" button to perform user inputs for appropriate calculation
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculate-button').addEventListener('click', calculate);
  
  document.getElementById('mode-switch').addEventListener('change', function () {
    const description = this.checked ? 'Loan Payment' : 'Compound Interest';
    document.getElementById('toggle-description').textContent = description;
  });
});
  
// Export functions for testing in jsdom, jest environment
module.exports = { calculateCompoundInterest, calculateLoanPayment, sanitizeHTML };