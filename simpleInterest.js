document.addEventListener("DOMContentLoaded", function() {
    function calc_simple_interest() {
        const container = document.getElementById("result");
        const interest_rate = document.getElementById("interest_rate").value;
        const investment_term = document.getElementById("investment-term").value;
        const principal = document.getElementById("principal").value;

        const interest_gain = investment_term * (interest_rate / 100) * principal;

        container.innerHTML = `The interest gained is $${interest_gain.toFixed(2)}`;
    }

    document.getElementById("calculate-button").addEventListener("click", calc_simple_interest);
});
