document.addEventListener("DOMContentLoaded", function () {

    const usernameInput = document.getElementById("username");

    usernameInput.addEventListener("input", function () {
        console.log("Username changed to:", usernameInput.value);
        // regex to check if the username is 8 characters long and contains at least 1 capital letter, 1 number and 1 special character
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;
        if (regex.test(usernameInput.value)) {
            // set the input field bordercolor to green
            usernameInput.style.borderColor = "green";
            console.log("Valid username");
        } else {
            // set the input field bordercolor to red
            usernameInput.style.borderColor = "red";
            console.log("Invalid username");
        }
    });

    const getMonthlyData = () => {
        const months = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        const incomeData = [];
        const expenseData = [];

        months.forEach((month) => {
            const incomeInput = document.getElementById(`income-${month}-input`);
            const expenseInput = document.getElementById(`expense-${month}-input`);

            const incomeValue = parseFloat(incomeInput.value) || 0;
            const expenseValue = parseFloat(expenseInput.value) || 0;

            incomeData.push(incomeValue);
            expenseData.push(expenseValue);
        });

        return { incomeData, expenseData };
    };

    let chartInstance = null;

    const renderChart = () => {
        const ctx = document.getElementById("myChart").getContext("2d");
        const { incomeData, expenseData } = getMonthlyData();

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ],
                datasets: [
                    {
                        label: "Income",
                        data: incomeData,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Expense",
                        data: expenseData,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    document.getElementById('chart-tab').addEventListener('click', function () {
        renderChart();
    });

    document.getElementById('download-button').addEventListener('click', function () {
        const canvas = document.getElementById('myChart');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png';
        link.click();
    });
});