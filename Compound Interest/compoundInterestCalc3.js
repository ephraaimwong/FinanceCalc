let isLoanMode = false;

function toggleMode() {
  const modeLabel = document.getElementById('calculationLabel');
  const compoundsLabel = document.getElementById('compoundsLabel');
  const compoundsInput = document.getElementById('compounds');

  if (document.getElementById('calculationMode').checked) {
    isLoanMode = true;
    modeLabel.textContent = "Loan Payment";
    compoundsLabel.style.display = "none";
    compoundsInput.style.display = "none";
  } else {
    isLoanMode = false;
    modeLabel.textContent = "Compound Interest";
    compoundsLabel.style.display = "block";
    compoundsInput.style.display = "block";
  }
}

function calculate() {
  if (isLoanMode) {
    calculateLoanPayment();
  } else {
    calculateCompoundInterest();
  }
}

function calculateCompoundInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  let time = parseFloat(document.getElementById('time').value);
  const timePeriod = document.getElementById('time-period').value;
  const compounds = parseFloat(document.getElementById('compounds').value);

  // Adjust time for selected period (convert to years)
  if (timePeriod === 'months') {
    time /= 12;
  } else if (timePeriod === 'days') {
    time /= 365;
  }

  if (!isNaN(principal) && !isNaN(rate) && !isNaN(time) && !isNaN(compounds) && compounds > 0) {
    const totalPeriods = Math.ceil(time * compounds);
    let balance = principal;
    let schedule = `<table><tr><th>Period</th><th>Balance</th></tr>`;

    for (let period = 1; period <= totalPeriods; period++) {
      balance = principal * Math.pow(1 + rate / compounds, period);
      schedule += `<tr><td>${period}</td><td>$${balance.toFixed(2)}</td></tr>`;
    }

    const compoundInterest = principal * Math.pow((1 + rate / compounds), compounds * time);
    const totalAmount = compoundInterest.toFixed(2);
    const interestEarned = (compoundInterest - principal).toFixed(2);

    document.getElementById('result').innerHTML = `<p>Total Amount: $${totalAmount}</p><p>Interest Earned: $${interestEarned}</p>`;
    document.getElementById('schedule').innerHTML = schedule + `</table>`;
    document.querySelector('.scheduleTable').style.display = 'block';
  } else {
    document.getElementById('result').innerHTML = 'Please enter valid inputs.';
    document.getElementById('schedule').innerHTML = '';
    document.querySelector('.scheduleTable').style.display = 'none';
  }
}

function calculateLoanPayment() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  let time = parseFloat(document.getElementById('time').value);
  const timePeriod = document.getElementById('time-period').value;

  // Adjust time for selected period (convert to years)
  if (timePeriod === 'months') {
    time /= 12;
  } else if (timePeriod === 'days') {
    time /= 365;
  }

  if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
    const monthlyRate = rate / 12;
    const numberOfPayments = time * 12;

    // Loan payment formula: P = [r * PV] / [1 - (1 + r)^-n]
    const monthlyPayment = (monthlyRate * principal) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPayment = (monthlyPayment * numberOfPayments).toFixed(2);
    const totalInterest = (totalPayment - principal).toFixed(2);

    document.getElementById('result').innerHTML = `<p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p><p>Total Interest: $${totalInterest}</p>`;
    document.querySelector('.scheduleTable').style.display = 'block';
  } else {
    document.getElementById('result').innerHTML = 'Please enter valid inputs.';
    document.querySelector('.scheduleTable').style.display = 'none';
  }
}
