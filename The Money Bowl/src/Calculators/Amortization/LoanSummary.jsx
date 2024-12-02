import "./Styles/LoanSummary.css";
const LoanSummary = ({ results }) => (
    <div className="loan-summary">
      <h3>Loan Summary</h3>
      <p>Principal: ${results.principal.toLocaleString()}</p>
      <p>Total Payments: {results.numPayments}</p>
      <p>Monthly Payment: ${results.monthlyPayment}</p>
    </div>
  );
  
  export default LoanSummary;
  