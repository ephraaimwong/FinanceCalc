
// var interestRate; //APR
// var numPayments; //monthly payments
//var balance; //outstanding balance of principle
//var principal;
function validate(val){
    if (val==null||val=="") {
        return false;
    }
    return true;
}
function getInputs(){
    var principal = parseFloat(document.getElementsByName("principal")[0].value) 
    - parseFloat(document.getElementsByName("down")[0].value);
var interestRate = parseFloat(document.getElementsByName("interest")[0].value) / 100; // Convert percentage to decimal
var numPayments = parseInt(document.getElementsByName("term")[0].value) * 12;


    //clear table when re-calculating
    var table=document.getElementById("amortTable");
    table.innerHTML="";
    var head=document.getElementById("amortHead");
    head.innerHTML="";
    var validBal = validate(principal);
    var validInt = validate(interestRate);
    if (validBal && validInt) {
        head.innerHTML+=overview(principal,interestRate,numPayments)
        table.innerHTML+=evalAmort(principal,interestRate,numPayments)
    }else{
        table.innerHTML+="Invalid inputs, please check inputs";
    }
}
function overview(principal,interestRate,numPayments) {
    var interestMonthly = interestRate/12;
    var monthlyPayment = principal * (interestMonthly*(Math.pow(1+interestMonthly,numPayments))/(Math.pow(1+interestMonthly, numPayments)-1));
    // var resultOverview = "Loan Amount(Principal): $" + principal.toFixed(2) + "<br></br>" 
    // + "Interest Rate (APR): " + interestRate.toFixed(2)+ "<br></br>"
    // + "Loan Term (Number of payments): " + numPayments +"<br></br>"
    // + "Monthly Payment :" + monthlyPayment.toFixed(2) +"<br></br>"
    // + "Total Interest Paid: " + (monthlyPayment*numPayments-principal).toFixed(2)+ "<br></br>"
    // + "Total paid: " + (monthlyPayment*numPayments).toFixed(2) + "<br></br>";
    var resultOverview ="<table><tr><td>Loan Amount(Principal):</td><td>"+"$"+principal.toFixed(2)+"</td></tr><tr><td>Down Payment:</td><td>"+"$"+parseFloat(document.getElementsByName("down")[0].value)+"</td></tr><tr><td>Loan Term(No. of Payments): </td><td>"+numPayments+"</td></tr><tr><td>Monthly Payment:</td><td>"+"$"+monthlyPayment.toFixed(2)+"</td></tr><tr><td>Total Interest Paid:</td><td>"+"$"+(monthlyPayment*numPayments-principal).toFixed(2)+"</td></tr><tr><td>Total Paid:</td><td>"+"$"+(monthlyPayment*numPayments).toFixed(2)+"</td></tr></table>";
    return resultOverview;
}
function evalAmort(principal, interestRate, numPayments){
    let balance = principal;
    //get monthly rate
    var interestMonthly = interestRate/12;
    
    //calculate payment
    var monthlyPayment = principal * (interestMonthly*(Math.pow(1+interestMonthly,numPayments))/(Math.pow(1+interestMonthly, numPayments)-1));
    //toFixed(x) method converts number to string and rounds to x decimals, <br></br> is break line

    //tr = table row, th = table header, td = table data cell
    var resultTable = "<table><tr><th>Month</th><th>Balance</th><th>Towards Interest</th><th>Towards Principal</th></tr>";
    let loopInterest=0;
    let loopPrincipal=0;
    for(let i=1;i<numPayments+1;i++){
        //start new row with each loop
        resultTable+="<tr>";
        //data cell input for month
        resultTable+="<td>"+i+"</td>";
        //data cell input for balance
        resultTable+="<td>"+balance.toFixed(2)+"</td>";
        //interest portion of monthly payment
        loopInterest = balance*interestMonthly;
        resultTable+="<td>"+loopInterest.toFixed(2)+"</td>";
        //principle of monthly payment
        loopPrincipal = monthlyPayment-loopInterest;
        resultTable+="<td>"+loopPrincipal.toFixed(2)+"</td>";

        

        //close the row
        resultTable+="</tr>";
        //update balance principal
        balance-=loopPrincipal;
    }
    //close the table
    resultTable+="</table>"
    //entire schedule returned as concatenated string
    return resultTable;
}

