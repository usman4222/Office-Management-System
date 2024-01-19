import React from 'react';
import { PolarArea } from 'react-chartjs-2';

const DateChart = () => {
    const data = {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [11, 16, 7, 3, 14],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)',
                ],
            },
        ],
    };

    const options = {
        scales: {
            r: {
                type: 'radialLinear', // Use 'radialLinear' or 'linear'
                grid: {
                    circular: true,
                },
                min: 0,
                max: 20, // You can adjust this based on your data
            },
        },
    };

    return (
        <div>
            <PolarArea data={data} options={options} />
        </div>
    );
};

export default DateChart;
