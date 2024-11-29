const { simpleInterest } = require('../calculator'); // Adjust path as needed

test('Calculate simple interest correctly', () => {
  const principal = 1000;
  const rate = 5;
  const time = 1;

  const result = simpleInterest(principal, rate, time);

  expect(result).toBe(50); // 1000 * 5% * 1 = 50
});
