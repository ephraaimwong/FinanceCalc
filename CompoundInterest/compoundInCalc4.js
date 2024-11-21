//Author: Jarrett Covington, Compound Interest Calculator .js

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

function getUserInputs() {
  return {
    principal: parseFloat(document.getElementById('principal').value),
    rate: parseFloat(document.getElementById('rate').value),
    time: parseFloat(document.getElementById('time').value),
    timePeriod: document.getElementById('time-period').value,
    compounds: parseFloat(document.getElementById('compounds').value),
  };
}

function validateInputs(inputs) {
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
    if (inputs.isLoanMode && (isNaN(inputs.compounds) || inputs.compounds <= 0)) {
      errors.push('Compounds per year must be a positive number.');
    }
  
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
  
    console.log("calculating compound interest");
    console.log("total amount", totalAmount);

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

  function displayLoanResults({ principal, rate, time }) {
    const result = calculateLoanPayment(principal, rate, time);
    const safeContent = DOMPurify.sanitize(`
      <p>Monthly Payment: $${result.monthlyPayment.toFixed(2)}</p>
      <p>Total Payment: $${result.totalPayment.toFixed(2)}</p>
      <p>Total Interest: $${result.totalInterest.toFixed(2)}</p>
    `);
    
    document.getElementById('result').innerHTML = safeContent;
    document.querySelector('.scheduleTable').style.display = 'block';
  }
  
  function displayCompoundInterestResults({ principal, rate, time, timePeriod, compounds }) {
    const result = calculateCompoundInterest(principal, rate, time, timePeriod, compounds);
    const safeContent = DOMPurify.sanitize(`
      <p>Total Amount: $${result.totalAmount.toFixed(2)}</p>
      <p>Interest Earned: $${result.interestEarned.toFixed(2)}</p>
    `);
    document.getElementById('result').innerHTML = safeContent;
    console.log("results", result);
    document.querySelector('.scheduleTable').style.display = 'block';
  }

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate-button').addEventListener('click', function() {
    console.log("Button Clicked")
    calculate(); // Call the calculate function
  });
});

document.getElementById('mode-switch').addEventListener('change', function () {
  const description = this.checked ? 'Loan Payment' : 'Compound Interest';
  document.getElementById('toggle-description').textContent = description;
});
  