document.addEventListener("DOMContentLoaded", function() {
    function calc_simple_interest() {
        const container = document.getElementById("result");

        // Retrieve input values
        const interest_rate = parseFloat(document.getElementById("rate").value);
        const period = parseFloat(document.getElementById("period").value);
        const principal = parseFloat(document.getElementById("principal").value);
        let total_interest = 0
        let graphPeriod = []; // Creates an empty array for the graphPeriod
        let balanceArray = []; // Array for the accumulated interest + principal




        // // // Retrieve the selected radio button for interest term and period time
        // const interest_term = document.querySelector('input[name="interest-term"]:checked').value;
        // const period_time = document.querySelector('input[name="period-time"]:checked').value;

        // // Ensure the inputs are valid numbers
        if (isNaN(interest_rate) || isNaN(period) || isNaN(principal) || interest_rate <= 0 || period <= 0 || principal <= 0) {
            container.innerHTML = "Please enter valid numbers for all fields.";
            return;
        }
        else{
            total_interest = principal * (interest_rate / 100) * period
        }

        // Getting all the data we need for the Growth Trend Graph
         for(let i=0; i <= period; i++){
                let timing = i + "Yr";
                graphPeriod.push(timing);
            }
            let principalArray = new Array(period +1).fill(principal);
            balanceArray.push(principal);


        // Additional Work for the table and graph

        let interest_repeat = 0;

        // If the period is writer in whole number integer years

        if (Number.isInteger(period)){
            const tableBody = document.querySelector('#dynamicTable tbody');
            current_principle = principal + interest_repeat
            interest_repeat = total_interest / period;
            populateTable("Years", period, principal, interest_repeat);
            createDoughnutChart(principal, total_interest);
            growthTrendChart(graphPeriod, principalArray, balanceArray);

            // Proceed to make a table
        }
        
        else {
            const periodTerm = "Months";
            term_year =  12 * period
            interest_repeat = total_interest / term_year;
            populateTable(periodTerm, term_year, principal, interest_repeat);
            createDoughnutChart(principal, total_interest);
            growthTrendChart(graphPeriod, principalArray, balanceArray);
        }

    function populateTable(periodTerm, num_of_years, initial_principle, r_interest){
        let tableTerm = document.querySelector('#dynamicTable th');
        tableTerm.conte = periodTerm;
        const tableBody = document.querySelector('#dynamicTable tbody');

        // Populate the table using the terms in Years
        let balance = initial_principle
        for( let i = 1; i <= num_of_years; i++){

            balance = balance + r_interest;
            // Create a new row
            let row = document.createElement('tr');

            // Create and append the 'Period Cell'
            let yearCell = document.createElement('td');
                yearCell.textContent = `${i}`;
                row.appendChild(yearCell);


            // Create and append the 'Interest' cell
            let interestCol = document.createElement('td');
            interestCol.textContent = "$" + Number(`${r_interest}`).toFixed(2);
            row.appendChild(interestCol);

            // Create and append the 'Balance' cell
            let balCol = document.createElement('td');
            balCol.textContent = "$" + Number(`${balance}`).toFixed(2);
            balanceArray.push(balance);
            row.appendChild(balCol);

            // Append the row to the table body
            tableBody.appendChild(row);
        }
    }
        // if (interest_term === period_time){
            
        // }
        // else{
        //     if (interest_term === "MONTHS"){
        //         total_interest = principal * (interest_rate / 100) * period * 12
        //     }
        //     else {
        //         total_interest = principal * (interest_rate / 100) * period / 12
        //     }
        // }

        // // Calculate simple interest
        // Display the result
        container.innerHTML = `The interest gained is ${total_interest}`;

    }


    document.getElementById("calculate-button").addEventListener("click", calc_simple_interest);




    // Section to create the doughnut graph

    function createDoughnutChart(principal, total_interest) {
    // Get the canvas element and context for the doughnut chart
    const DONUT = document.getElementById("doughnutChart").getContext('2d');

    // Data for the doughnut chart
    let mydata = {
        labels: [
            "PRINCIPLE",
            "INTEREST"
        ],
        datasets: [{
            data: [principal, total_interest],
            backgroundColor: [
                'rgba(29, 53, 87, 1)',
                'rgba(33, 158, 188, 1)'
            ],
            hoverOffset: 4
        }]
    };

    // Create the doughnut chart
    let donutChart = new Chart(DONUT, {
        type: 'doughnut',
        data: mydata,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

// Growth Trends Graph 
function growthTrendChart(graphPeriod, principalArray, balanceArray) {
    const ctx = document.getElementById('growthTrendChart').getContext('2d');

    const data = {
        labels: graphPeriod, // Use the provided graphPeriod for labels
        datasets: [
            {
                label: 'Principal',
                backgroundColor: 'rgba(29, 53, 87, 1)',  // Dark blue color
                data: principalArray,  // Use the provided principalArray
                fill: true,  // No filling for the line
                borderColor: 'rgba(29, 53, 87, 1)',  // Color of the line
                borderWidth: 2,  // Width of the line
            },
            {
                label: 'Balance',
                backgroundColor: 'rgba(33, 158, 188, 1)',  // Light blue color
                data: balanceArray,  // Use the provided interestArray
                fill: true,  // Area below is filled
                borderColor: 'rgba(33, 158, 188, 1)',  // Color of the line
                borderWidth: 2,  // Width of the line
            },
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Growth Trend'
                }
            },
            elements: {
                line: {
                    tension: 0,  // No curvature (straight lines)
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            }
        }
    };
    let growthTrendChart = new Chart(ctx, config);
}


});
