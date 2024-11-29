document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element and context for the doughnut chart
    const DONUT = document.getElementById("doughnutChart").getContext('2d');

    // Data for the doughnut chart
    let mydata = {
        labels: [
            "PRINCIPLE",
            "INTEREST"
        ],
        datasets: [{
            data: [300, 50],
            backgroundColor: [
                'rgba(29, 53, 87, 1)',
                'rgba(33, 158, 188, 1)'
            ],
            hoverOffset: 4
        }]
    };

    // Create the doughnut chart
    let donutChart = new Chart(DONUT, {
        type: 'doughnut',
        data: mydata,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
