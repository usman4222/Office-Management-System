import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import './dashBoard.css';
import Header from '../../components/Header';
import PeopleIcon from '@material-ui/icons/People'
import { Bar } from 'react-chartjs-2';
import { DoughnutChart, LineChart } from './Chart';
import DateChart from './DateChart';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/addUserAction';
import { getAllExpenses, getCurrentMonthExpenses } from '../../actions/financeController';
import ReactApexChart from 'react-apexcharts';


const DashBoard = () => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.allUser);
    const { totalMonthlyExpenses } = useSelector((state) => state.currentMonthTotal);
    const { expenses } = useSelector((state) => state.allExpenses);
    const [chartData, setChartData] = useState({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });


    // console.log(currentMonthTotal);


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllExpenses());
        dispatch(getCurrentMonthExpenses())
        console.log(totalMonthlyExpenses);
    }, [dispatch, totalMonthlyExpenses]);

    // Calculate total expenses
    const calculateTotalExpenses = () => {
        return expenses.reduce((accumulator, expense) => {
            return accumulator + parseFloat(expense.amount);
        }, 0);
    };

    useEffect(() => {
        const startCount = 0; // Starting count
        const endCount = 123; // Ending count
        const duration = 4000; // Animation duration in milliseconds
        const intervalTime = 50; // Interval for updating count (milliseconds)
        const steps = Math.ceil(duration / intervalTime);
        const increment = Math.ceil((endCount - startCount) / steps);

        let currentCount = startCount;
        const interval = setInterval(() => {
            if (currentCount < endCount) {
                currentCount += increment;
                setCount(currentCount > endCount ? endCount : currentCount);
            } else {
                clearInterval(interval);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);


    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Expenses',
    //             backgroundColor: 'rgba(54, 162, 235, 0.6)',
    //             borderColor: 'rgba(54, 162, 235, 1)',
    //             borderWidth: 1,
    //             hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
    //             hoverBorderColor: 'rgba(54, 162, 235, 1)',
    //             data: [500, 750, 600, 900, 400, 650], // Replace with your expenses data
    //         },
    //     ],
    // };
    

    return (
        <Fragment>
            <div className='main'>
                <div className='row main-r1'>
                    <div className='col-lg-2  main-r1-b1'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10  main-r1-b2'>
                        <div className='row main-r2'>
                            <Header />
                        </div>
                        <div className='row main-r3'>
                            <div className='col-lg-3  main-r3-b1'>
                                <div>
                                    <div className='row main-r3-b1-r1'>
                                        <div className='col-lg-6 main-r3-b1-r1-b1'>
                                            <div className='people'><PeopleIcon /></div>
                                        </div>
                                        <div className='col-lg-6 main-r3-b1-r1-b2'>
                                            <div className="tsp-countUp col-md-2 col-sm-4 col-xs-6 tsp-full-xs tsp-no-padding-left tsp-item-1">
                                                <div className="tsp-box-counter">
                                                    <i className="fa fa-suitcase"></i>
                                                    <div className="tsp-count">
                                                        <p className="count">{calculateTotalExpenses()}</p>
                                                        <p className="tsp-section">Current</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3  main-r3-b1' >
                                <div>
                                    <div className='row main-r3-b1-r1'>
                                        <div className='col-lg-6 main-r3-b1-r1-b1'>
                                            <div className='revenue'><PeopleIcon /></div>
                                        </div>
                                        <div className='col-lg-6 main-r3-b1-r1-b2'>
                                            <div className="tsp-countUp col-md-2 col-sm-4 col-xs-6 tsp-full-xs tsp-no-padding-left tsp-item-1">
                                                <div className="tsp-box-counter">
                                                    <i className="fa fa-suitcase"></i>
                                                    <div className="tsp-count">
                                                        <p className="count">{users.length}</p>
                                                        <p className="tsp-section">Users</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3  main-r3-b1'>
                                <div>
                                    <div className='row main-r3-b1-r1'>
                                        <div className='col-lg-4 main-r3-b1-r1-b1'>
                                            <div className='att'><PeopleIcon /></div>
                                        </div>
                                        <div className='col-lg-8 main-r3-b1-r1-b2'>
                                            <div className="tsp-countUp col-md-2 col-sm-4 col-xs-6 tsp-full-xs tsp-no-padding-left tsp-item-1">
                                                <div className="tsp-box-counter">
                                                    <i className="fa fa-suitcase"></i>
                                                    <div className="tsp-count">
                                                        <p className="count">{totalMonthlyExpenses}</p>
                                                        <p className="tsp-section">Total </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                {/* <LineChart/> */}
                                {/* <DoughnutChart/> */}
                                {/* <DateChart /> */}
                                <div id='chart'>
                                    <ReactApexChart options={chartData.options} series={chartData.series} type='pie' width={380} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashBoard;