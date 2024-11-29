function simpleInterest(principal, rate, time) {
    return (principal * rate * time) / 100;
  }
  
  module.exports = { simpleInterest }; // Export for Jest

  