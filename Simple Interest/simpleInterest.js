document.addEventListener("DOMContentLoaded", function() {
    function calc_simple_interest() {
        const container = document.getElementById("result");

        // Retrieve input values
        const interest_rate = parseFloat(document.getElementById("rate").value);
        const period = parseFloat(document.getElementById("period").value);
        const principal = parseFloat(document.getElementById("principal").value);
        let total_interest = 0

        // // // Retrieve the selected radio button for interest term and period time
        // const interest_term = document.querySelector('input[name="interest-term"]:checked').value;
        // const period_time = document.querySelector('input[name="period-time"]:checked').value;

        // // Ensure the inputs are valid numbers
        if (isNaN(interest_rate) || isNaN(period) || isNaN(principal)) {
            container.innerHTML = "Please enter valid numbers for all fields.";
            return;
        }
        else{
            total_interest = principal * (interest_rate / 100) * period
        }


        // Additional Work for the table and graph

        let interest_repeat = 0;

        // If the period is writer in whole number integer years

        if (Number.isInteger(period)){
            const tableBody = document.querySelector('#dynamicTable tbody');
            current_principle = principal + interest_repeat
            interest_repeat = total_interest / period;
            populateTable("Years", period, principal, interest_repeat);

            // Proceed to make a table
        }
        
        else {
            const periodTerm = "Months";
            term_year =  12 * period
            interest_repeat = total_interest / term_year;
            populateTable(periodTerm, term_year, principal, interest_repeat);
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
            interestCol.textContent = Number(`${r_interest}`).toFixed(2);
            row.appendChild(interestCol);

            // Create and append the 'Balance' cell
            let balCol = document.createElement('td');
            balCol.textContent = Number(`${balance}`).toFixed(2);
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
});
