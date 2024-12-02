import "./Styles/PaymentBreakdown.css";
const PaymentBreakdown = ({ results }) => (
    <div className="payment-breakdown">
      <h3>Payment Breakdown</h3>
      <p>Total Interest: ${results.totalInterest}</p>
      <p>Total Paid: ${results.totalPaid}</p>
    </div>
  );
  
  export default PaymentBreakdown;
  