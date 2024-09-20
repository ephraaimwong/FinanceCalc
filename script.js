document.addEventListener("DOMContentLoaded", function() {
    let interestPeriod = "years"; // Default interest period
    let investmentPeriod = "years"; // Default investment period

    function calc_simple_interest() {
        const container = document.getElementById("result");
        const interestRate = parseFloat(document.getElementById("interest-rate").value);
        const investmentTerm = parseFloat(document.getElementById("investment-term").value);
        const principal = parseFloat(document.getElementById("initial-investment").value);

        if (isNaN(principal) || isNaN(interestRate) || isNaN(investmentTerm)) {
            container.innerHTML = "Please enter all values.";
            return;
        }

        let interestGain;
        if (interestPeriod === "years") {
            interestGain = investmentTerm * (interestRate / 100) * principal;
        } else {
            const years = investmentTerm / 12;
            interestGain = years * (interestRate / 100) * principal;
        }

        container.innerHTML = `The interest gained is $${interestGain.toFixed(2)}`;
    }

    document.getElementById("calculate-button").addEventListener("click", calc_simple_interest);

    // Set interest period based on selected radio button
    document.querySelectorAll('input[name="interest-period"]').forEach(input => {
        input.addEventListener('change', function() {
            interestPeriod = this.value;
        });
    });

    // Set investment period based on selected radio button
    document.querySelectorAll('input[name="investment-period"]').forEach(input => {
        input.addEventListener('change', function() {
            investmentPeriod = this.value;
        });
    });
});
