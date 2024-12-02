import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import "./Styles/AmortizationChart.css";

Chart.register(...registerables); // Register required chart components

const AmortizationChart = ({ schedule }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Check if a chart already exists and destroy it before creating a new one
    if (window.amortizationChart) {
      window.amortizationChart.destroy();
    }

    const months = schedule.map((item) => item.month);
    const interestPaid = schedule.map((item) => item.interestPaid);
    const principalPaid = schedule.map((item) => item.principalPaid);

    window.amortizationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Interest Paid',
            data: interestPaid,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Principal Paid',
            data: principalPaid,
            borderColor: 'blue',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    return () => {
      // Cleanup the chart when the component unmounts
      if (window.amortizationChart) {
        window.amortizationChart.destroy();
      }
    };
  }, [schedule]);

  return(
    <div className='amortization-chart'>
  <canvas ref={canvasRef} />
  </div>
    );
};

export default AmortizationChart;
