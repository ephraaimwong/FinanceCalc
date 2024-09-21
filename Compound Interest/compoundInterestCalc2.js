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

    // Generate schedule
    for (let period = 1; period <= totalPeriods; period++) {
      balance = principal * Math.pow(1 + rate / compounds, period);
      schedule += `<tr><td>${period}</td><td>$${balance.toFixed(2)}</td></tr>`;
    }

    const compoundInterest = principal * Math.pow((1 + rate / compounds), compounds * time);
    const totalAmount = compoundInterest.toFixed(2);
    const interestEarned = (compoundInterest - principal).toFixed(2);
    
    //Display scheduleTable
   // document.getElementById('result').innerHTML = `
     //   <p>Total Amount: $${totalAmount}</p>
      //  <p>Interest Earned: $${interestEarned}</p>`;
      //document.getElementById('schedule').innerHTML = schedule + `</table>`;
  //  } else {
   //   document.getElementById('result').innerHTML = 'Please enter valid inputs.';
   //   document.getElementById('schedule').innerHTML = '';
   // }
 // }

  document.getElementById('result').innerHTML = `
  <p>Total Amount: $${totalAmount}</p>
  <p>Interest Earned: $${interestEarned}</p>`;
document.getElementById('schedule').innerHTML = schedule + `</table>`;

// Make the scheduleTable visible
document.querySelector('.scheduleTable').style.display = 'block';
} else {
document.getElementById('result').innerHTML = 'Please enter valid inputs.';
document.getElementById('schedule').innerHTML = '';
document.querySelector('.scheduleTable').style.display = 'none';  // Hide table if inputs are invalid
}
}