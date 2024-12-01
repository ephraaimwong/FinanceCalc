import "./Styles/AmortizationTable.css";

const AmortizationTable = ({ schedule }) => (
    <div className="amortization-table">
      <h3>Amortization Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Balance</th>
            <th>Interest Paid</th>
            <th>Principal Paid</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(({ month, balance, interestPaid, principalPaid }) => (
            <tr key={month}>
              <td>{month}</td>
              <td>${parseFloat(balance).toLocaleString()}</td>
              <td>${parseFloat(interestPaid).toLocaleString()}</td>
              <td>${parseFloat(principalPaid).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default AmortizationTable;
  