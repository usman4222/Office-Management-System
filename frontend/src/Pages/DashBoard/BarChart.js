import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getAllExpenses } from "../../actions/financeController";
import { useDispatch, useSelector } from "react-redux";

Chart.register(CategoryScale);

const BarChart = () => {
    const chartRef = useRef(null);
    const { expenses } = useSelector((state) => state.allExpenses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpenses());
    }, [dispatch]);

    useEffect(() => {
        if (expenses.length === 0) return;

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Extract data from expenses for each month of the current year
        const monthlyData = Array.from({ length: 12 }, (_, monthIndex) => {
            const monthExpenses = expenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                const expenseMonth = expenseDate.getMonth();
                const expenseYear = expenseDate.getFullYear();
                return expenseMonth === monthIndex && expenseYear === currentYear;
            });

            // Calculate the total amount for the month
            const totalAmount = monthExpenses.reduce(
                (accumulator, expense) => accumulator + parseFloat(expense.amount),
                0
            );

            return totalAmount;
        });

        // Update the chart data with the dynamically generated data
        const chartData = {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [
                {
                    label: "Total Monthly Expenses",
                    data: monthlyData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 205, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 205, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const ctx = chartRef.current.getContext("2d");
        const myChart = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: {
                scales: {
                    x: {
                        type: "category",
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [expenses]);

    return (
        <div>
            {/* <h2>Total Monthly Expenses (Current Year)</h2> */}
            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
};

export default BarChart;
