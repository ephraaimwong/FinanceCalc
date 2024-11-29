function calcSimpleInterest(interestRate, period, principal) {
    // Ensure the inputs are valid numbers and handle edge cases
    if (isNaN(interestRate) || isNaN(period) || isNaN(principal)) {
        throw new Error("Please enter valid numbers for all fields.");
    }
    if (interestRate <= 0 || period <= 0 || principal <= 0) {
        throw new Error("Interest rate, period, and principal must be positive numbers.");
    }
    if (interestRate > 100) {
        throw new Error("Interest rate cannot exceed 100%.");
    }

    // Calculate simple interest
    const totalInterest = principal * (interestRate / 100) * period;

    return totalInterest;
}

// Function that takes inputs: period term of interest, number of period (years, months), initial principle amount, interest period (time given for the interest)
function populateTable(periodTerm, numOfPeriods, initialPrincipal, interestPerPeriod) {
    const table = [];
    let balance = initialPrincipal; // Set a variable to return the balance generated after each increment of 1 period (month, year)

    // Iterate over the time of period of interest and get the new balance that should be returned
    for (let i = 1; i <= numOfPeriods; i++) {
        balance += interestPerPeriod;

        // Create a row object with the necessary data
        const row = {
            period: i,
            interest: interestPerPeriod.toFixed(2),
            balance: balance.toFixed(2),
        };
        // Generate a table with the updated output from calculating the interest
        table.push(row);
    }
    // Return the table for display
    return {
        periodTerm: periodTerm,
        table: table,
    };
}

module.exports = {
    calcSimpleInterest,
    populateTable,
};
