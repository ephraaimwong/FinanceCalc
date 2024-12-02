import React, { useState } from 'react';
import LoanSummary from './LoanSummary';
import PaymentBreakdown from './PaymentBreakdown';
import AmortizationTable from './AmortizationTable';
import AmortizationChart from './AmortizationChart';
import './Styles/Amortization.css';

const MortgageCalculator = () => {
  const [inputs, setInputs] = useState({
    principal: 425000,
    downPayment: 85000,
    term: 30,
    interest: 6.25,
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => { e.preventDefault(); //Prevent form from auto-refreshing 
    calculate(); 
    };

  const calculate = () => {
    const principal = parseFloat(inputs.principal) - parseFloat(inputs.downPayment);
    const interestRate = parseFloat(inputs.interest) / 100;
    const numPayments = parseInt(inputs.term) * 12;

    if (principal <= 0 || interestRate <= 0) {
      alert('Invalid inputs. Please check your values.');
      return;
    }

    const interestMonthly = interestRate / 12;
    const monthlyPayment = principal * ((interestMonthly * Math.pow(1 + interestMonthly, numPayments)) / (Math.pow(1 + interestMonthly, numPayments) - 1));

    // Calculate amortization schedule
    const schedule = [];
    let balance = principal;
    for (let i = 1; i <= numPayments; i++) {
      const interestPaid = balance * interestMonthly;
      const principalPaid = monthlyPayment - interestPaid;
      balance -= principalPaid;
      schedule.push({
        month: i,
        balance: balance.toFixed(2),
        interestPaid: interestPaid.toFixed(2),
        principalPaid: principalPaid.toFixed(2),
      });
    }

    setResults({
      principal,
      numPayments,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: (monthlyPayment * numPayments - principal).toFixed(2),
      totalPaid: (monthlyPayment * numPayments).toFixed(2),
      schedule,
    });
  };

  return (
    <div className = "amort-container">
    <div className='calculator'>
        <form onSubmit={handleSubmit}>
      <div>
        <label>Principal Amount:</label>
        <input type="number" name="principal" value={inputs.principal} onChange={handleChange} />
        <label>Down Payment:</label>
        <input type="number" name="downPayment" value={inputs.downPayment} onChange={handleChange} />
        <label>Loan Term (Years):</label>
        <select name="term" value={inputs.term} onChange={handleChange}>
          {[30, 25, 20, 15, 10, 5].map((term) => (
            <option key={term} value={term}>
              {term} years
            </option>
          ))}
        </select>
        <label>Interest Rate (%):</label>
        <input type="number" name="interest" value={inputs.interest} onChange={handleChange} />
        <button className='eval-button' onClick={calculate}>Calculate</button>
      </div>
      </form>
      </div>

      {results && (
        <div className='results-grid'>
          <LoanSummary results={results} />
          <PaymentBreakdown results={results} />
          <AmortizationTable schedule={results.schedule} />
          <AmortizationChart schedule={results.schedule} />
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
