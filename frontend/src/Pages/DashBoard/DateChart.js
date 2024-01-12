import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const DateChart = () => {
    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime'
        },
        grid: {
            show: false
        },
        title: {
            text: "Market",
            style: {
                fontSize: '14px', fontWeight: 'bold', color: '#00ffea'
            }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime'
        },
        dateLabels: {
            enabled: false
        },
        yaxis: {
            show: false
        },
        color: ['#00ffea'],
        tooltip: {
            y: {
                formatter: (value) => { return value.toFixed(2) }
            }, theme: 'dark'
        },
        selection: 365
    });

    const [series, setSeries] = useState([
        {
            name: 'Market Price',
            data: [[1645837250522, 39804.53519937617]]
        }
    ]);

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="area"
                width="500"
            />
        </div>
    );
};

export default DateChart;
