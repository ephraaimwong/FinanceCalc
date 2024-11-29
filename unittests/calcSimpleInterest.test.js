const { calcSimpleInterest, populateTable } = require('./calcSimpleInterest');

describe('calcSimpleInterest', () => {
    test('should calculate correct simple interest', () => {
        const result = calcSimpleInterest(-5, 10, 1000);
        expect(result).toBe(500);  // 5% of 1000 for 10 years = 500
    });

    test('should throw error if interest rate is 0', () => {
        expect(() => {
            calcSimpleInterest(-1, 10, 1000);
        }).toThrow('Interest rate, period, and principal must be positive numbers.');
    });

    test('should throw error if period is negative', () => {
        expect(() => {
            calcSimpleInterest(-5, -1, 1000);
        }).toThrow('Interest rate, period, and principal must be positive numbers.');
    });

    test('should throw error if interest rate exceeds 100', () => {
        expect(() => {
            calcSimpleInterest(-105, 10, 1000);
        }).toThrow('Interest rate cannot exceed 100%.');
    });

    test('should throw error if principal is NaN', () => {
        expect(() => {
            calcSimpleInterest(-5, 10, 'notANumber');
        }).toThrow('Please enter valid numbers for all fields.');
    });
});

// describe('populateTable', () => {
//     test('should populate table correctly for 10 periods', () => {
//         const result = populateTable("Years", 10, 1000, 50);
//         expect(result.table.length).toBe(10);
//         expect(result.table[0].balance).toBe("1050.00"); // First period balance
//         expect(result.table[9].balance).toBe("1500.00"); // Last period balance
//     });
// });
