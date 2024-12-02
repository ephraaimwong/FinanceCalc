// import Chart from "chart.js/auto";

// var interestRate; //APR
// var numPayments; //monthly payments
//var balance; //outstanding balance of principle
//var principal;
function validate(val) {
  if (val == null || val == "" || val <=0) {
    return false;
  }
  if (!(/^[0-9]*\.?[0-9]+$/.test(val.toString().trim()))){
    return false;
  }
  return true;
}

function getInputs() {
  var down = document.getElementsByName("down")[0].value;
  var principal =
    document.getElementsByName("principal")[0].value -
    down
  var interestRate =
    document.getElementsByName("interest")[0].value / 100; // Convert percentage to decimal
  
  var numPayments = parseInt(document.getElementsByName("term")[0].value) * 12;

  //clear table when re-calculating
  var table = document.getElementById("amortTable");
  table.innerHTML = "";
  var head = document.getElementById("amortHead");
  head.innerHTML = "";
  var breakdown = document.getElementById("amortInterest");
  breakdown.innerHTML = "";
  var validBal = validate(principal);
  var validInt = validate(interestRate);
  var validDown = validate(down);
  console.log("Interest:"+validInt);
  console.log("Bal:"+validBal);
  console.log("Down:"+validDown);
  if (validBal && validInt && validDown) {
    head.innerHTML += overview(principal, interestRate, numPayments);
    table.innerHTML += evalAmort(principal, interestRate, numPayments);
    breakdown.innerHTML += breakDown(principal, interestRate, numPayments);
  } else {
    table.innerHTML += "Invalid inputs, please check inputs";
  }
}
function overview(principal, interestRate, numPayments) {
  var interestMonthly = interestRate / 12;
  var monthlyPayment =
    principal *
    ((interestMonthly * Math.pow(1 + interestMonthly, numPayments)) /
      (Math.pow(1 + interestMonthly, numPayments) - 1));

  var startDate = new Date();
  var endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + numPayments);
  var endDateAsString = endDate.toLocaleDateString(undefined, {year: "numeric", month: "long", day:"numeric"});
//toLocaleString()formats number with commas and $

// The following return function generates the table for the loan summary to be displayed 
return (
  "<table>" +
    "<thead>" +
      "<tr>" +
        "<th colspan=2>Loan Summary</th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" + 
      "<tr>" +
        "<td>Loan Amount (Principal):</td>" +
        "<td>" + principal.toLocaleString(undefined, { style: "currency", currency: "USD" }) + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Down Payment:</td>" +
        "<td>" + parseFloat(document.getElementsByName("down")[0].value).toLocaleString(undefined, { style: "currency", currency: "USD" }) + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Loan Term (No. of Payments):</td>" +
        "<td>" + numPayments + "</td>" +
      "</tr>" +
      "<tr>" +
        "<td>Pay Off Date:</td>" +
        "<td>"+ endDateAsString+"</td>" +
      "</tr>" +
    "</tbody>" +
  "</table>"
);

}

function breakDown(principal, interestRate, numPayments) {
  var interestMonthly = interestRate / 12;
  var monthlyPayment =
    principal *
    ((interestMonthly * Math.pow(1 + interestMonthly, numPayments)) /
      (Math.pow(1 + interestMonthly, numPayments) - 1));
      return (
        "<table>" +
          "<thead>" +
            "<tr>" +
              "<th colspan=2>Payment Breakdown</th>" +
            "</tr>" +
          "</thead>" +
          "<tbody>" +
            "<tr>" +
              "<td>Monthly Payment:</td>" +
              "<td>" + monthlyPayment.toLocaleString(undefined, { style: "currency", currency: "USD" }) + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td>Total Interest Paid:</td>" +
              "<td>" + (monthlyPayment * numPayments - principal).toLocaleString(undefined, { style: "currency", currency: "USD" }) + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td>Total Paid:</td>" +
              "<td>" + (monthlyPayment * numPayments).toLocaleString(undefined, { style: "currency", currency: "USD" }) + "</td>" +
            "</tr>" +
          "</tbody>" +
        "</table>"
      );
      
}

function evalAmort(principal, interestRate, numPayments) {
  let balance = principal;
  //get monthly rate
  var interestMonthly = interestRate / 12;

  //calculate payment
  var monthlyPayment =
    principal *
    ((interestMonthly * Math.pow(1 + interestMonthly, numPayments)) /
      (Math.pow(1 + interestMonthly, numPayments) - 1));
  //toFixed(x) method converts number to string and rounds to x decimals, <br></br> is break line

  let interestArr = [];
  let principalArr = [];
  let monthArr = [];

  //tr = table row, th = table header, td = table data cell
  var resultTable =
    "<table><thead><tr><th colspan='5'>Schedule</th></tr><tr><th>No.</th><th>Month</th><th>Balance</th><th>Towards Interest</th><th>Towards Principal</th></tr></thead>";
  let loopInterest = 0;
  let loopPrincipal = 0;
  var startDate = new Date();
  var currDate = new Date(startDate);
  var currDateAsString = currDate.toLocaleDateString(undefined, {year: "numeric", month:"long"});
  for (let i = 0; i < numPayments ; i++) {
    currDate.setMonth(currDate.getMonth()+1);
    currDateAsString = currDate.toLocaleDateString(undefined, {year: "numeric", month:"long"});
    //start new row with each loop
    resultTable += "<tr>";
    //data cell input for month
    resultTable += "<td>" + (i+1) + "</td>";
    resultTable += "<td>" + currDateAsString + "</td>";
    //data cell input for balance
    resultTable += "<td>" + balance.toLocaleString(undefined, {style:"currency",currency:"usd"}) + "</td>";
    //interest portion of monthly payment
    loopInterest = balance * interestMonthly;
    resultTable += "<td>" + loopInterest.toLocaleString(undefined, {style:"currency",currency:"usd"}) + "</td>";
    //principle of monthly payment
    loopPrincipal = monthlyPayment - loopInterest;
    resultTable += "<td>" + loopPrincipal.toLocaleString(undefined, {style:"currency",currency:"usd"}) + "</td>";

    monthArr.push(i);
    interestArr.push(loopInterest);
    principalArr.push(loopPrincipal);

    //close the row
    resultTable += "</tr>";
    //update balance principal
    balance -= loopPrincipal;
  }
  //close the table
  resultTable += "</table>";

  //draw chart
  drawChart(monthArr, interestArr, principalArr);

  //entire schedule returned as concatenated string
  return resultTable;
}

//script pulled from Chart.js (CDN) in HTML file
function drawChart(month, interest, principal) {
  const ctx = document.getElementById("amortChart").getContext("2d");
  // Clear the previous chart instance if it exists
  if (window.amortizationChart) {
    window.amortizationChart.destroy();
  }

  // Create a new chart and store it in window.amortizationChart
  window.amortizationChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: month,
      datasets: [
        {
          label: "Interest Paid",
          data: interest,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          borderWidth: 2,
        },
        {
          label: "Principal Paid",
          data: principal,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Month" } },
        y: { title: { display: true, text: "Amount Paid (USD)" } },
      },
      responsive: true,//allows for dynamatic resizing (zooming out)
      // maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Amortization: Interest v. Principal Paid Over Time",
        },
      },
    },
  });
}

function calcDown() {
  let homePrice = document.getElementsByName("principal")[0].value;
  let percent = document.getElementById("downPayment-percent").value;

  let downPayment = (homePrice * (percent / 100)).toFixed(2);
  document.getElementById("downPayment-amount").value = downPayment;
}



function convert_xlsx() {
  // document.getElementById('export-btn').addEventListener('click', )
  var table = document.getElementById('amortTable');
  var workbook = XLSX.utils.table_to_book(table); //convert table to workbook (data format of spreadsheets)
  var wbBString = XLSX.write(workbook, {bookType: 'xlsx', type: 'binary'}); //convert workbook to binarystring
  function convert_BString2Blob(s){ //convert binary string to Blob
    var buffer = new ArrayBuffer(s.length); // Blob requires an ArrayBuffer (low level block of mem)
    var view = new Uint8Array(buffer); // Uint8Array is 8 bit unsigned integer array, manipulate buffer with this.
    for (var i =0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //.charCodeAt() returns unicode val of char, & 0xFF is AND operation that ensures only lower 8 bits of unicode is used.
    return buffer;
  }

  blob = new Blob([convert_BString2Blob(wbBString)], {type: 'application/octet-stream'}); //create Blob from ArrayBuffer
  saveAs(blob, 'amortizationSchedule.xlsx'); // use FileSaver.js to save Blob as file
}

//if statement allows jest to run
if(typeof window !== 'undefined'){
  window.onload = () =>{
    getInputs();
    console.log(monthArr, interestArr, principalArr);
  }
}

module.exports={
  validate,
  overview,
  breakDown,
  evalAmort,
  getInputs
}

