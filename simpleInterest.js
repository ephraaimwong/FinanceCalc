document.addEventListener("DOMContentLoaded", function() {
    function calc_simple_interest() {
        const container = document.getElementById("result");

        // Retrieve input values
        const interest_rate = parseFloat(document.getElementById("interest_rate").value);
        const period = parseFloat(document.getElementById("period").value);
        const principal = parseFloat(document.getElementById("principal").value);
        let total_interest = 0

        // // Retrieve the selected radio button for interest term and period time
        const interest_term = document.querySelector('input[name="interest-term"]:checked').value;
        const period_time = document.querySelector('input[name="period-time"]:checked').value;

        // // Ensure the inputs are valid numbers
        if (isNaN(interest_rate) || isNaN(period) || isNaN(principal)) {
            container.innerHTML = "Please enter valid numbers for all fields.";
            return;
        }
        if (interest_term === period_time){
            total_interest = principal * (interest_rate / 100) * period
        }
        else{
            if (interest_term === "MONTHS"){
                total_interest = principal * (interest_rate / 100) * period * 12
            }
            else {
                total_interest = principal * (interest_rate / 100) * period / 12
            }
        }

        // // Calculate simple interest
        // Display the result
        calculator.innerHTML = `The interest gained is ${total_interest}`;
    }

    document.getElementById("calculate-button").addEventListener("click", calc_simple_interest);
});
