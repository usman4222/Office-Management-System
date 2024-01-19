import React, { Fragment, useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import './dashBoard.css';
import Header from '../../components/Header';
import PeopleIcon from '@material-ui/icons/People'
import { Bar } from 'react-chartjs-2';
import { DoughnutChart, LineChart } from './Chart';
import DateChart from './DateChart';
import { Doughnut } from 'react-chartjs-2';
import { GiExpense } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/addUserAction';
import { getAllExpenses, getCurrentMonthExpenses } from '../../actions/financeController';
import ReactApexChart from 'react-apexcharts';
import CountUp from 'react-countup';
import BarChart from './BarChart';

const DashBoard = ({ user }) => {
    const [count, setCount] = useState(0);
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.allUser);
    const { totalCurrentMonthExpenses } = useSelector((state) => state.currentMonthTotal);
    const { expenses } = useSelector((state) => state.allExpenses);


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllExpenses());
        dispatch(getCurrentMonthExpenses())
    }, [dispatch]);


    const calculateTotalExpenses = () => {
        return expenses.reduce((accumulator, expense) => {
            return accumulator + parseFloat(expense.amount);
        }, 0);
    };



    useEffect(() => {
        const startCount = 0;
        const endCount = 123;
        const duration = 4000;
        const intervalTime = 50;
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


    const internCount = users.filter(user => user.role === 'Intern').length;
    const employeeCount = users.filter(user => user.role === 'Employee').length;;

    const DoughnutChart = () => {
        const data = {
            labels: ["Total Intern's", 'Total Employees'],
            datasets: [
                {
                    label: 'Views',
                    data: [internCount, employeeCount],
                    borderColor: ['rgb(62,12, 171)', 'rgb(214, 44, 129)'],
                    backgroundColor: ['rgba(62,12, 171, 0.3)', 'rgba(214, 44, 129, 0.3)'],
                    borderWidth: 1,
                },
            ],
        };
        return <Doughnut data={data} />;
    };



    return (
        <Fragment>
            <div className='main'>
                <div className='row main-r1'>
                    <div className='col-lg-2  main-r1-b1'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10 col-sm-12  main-r1-b2'>
                        <div className='row main-r2'>
                            <Header />
                        </div>
                        <div className='row main-r3'>
                            <div className='col-lg-3  main-r3-b1'>
                                <div className='row main-r3-b1-r1'>
                                    <div className='col-lg-6 main-r3-b1-r1-b1'>
                                        <div className='people'><GiExpense /></div>
                                    </div>
                                    <div className='col-lg-6 main-r3-b1-r1-b2'>
                                        <div>
                                            <p className='count'><CountUp end={calculateTotalExpenses()} duration={2} /></p>
                                            <p>Total Expenses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3  main-r3-b1' >
                                <div className='row main-r3-b1-r1'>
                                    <div className='col-lg-6 main-r3-b1-r1-b1'>
                                        <div className='revenue'><PeopleIcon /></div>
                                    </div>
                                    <div className='col-lg-6 main-r3-b1-r1-b2'>
                                        <div>
                                            <p className='count'><CountUp end={users.length} duration={2} /></p>
                                            <p>Total Members</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3  main-r3-b1'>
                                <div className='row main-r3-b1-r1'>
                                    <div className='col-lg-6 main-r3-b1-r1-b1'>
                                        <div className='att'><PeopleIcon /></div>
                                    </div>
                                    <div className='col-lg-6 main-r3-b1-r1-b2'>
                                        <div>
                                            <p className='count'><CountUp end={totalCurrentMonthExpenses} duration={2} /></p>
                                            <p>Current Month Expenses </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row main-r4'>
                            <div className='col-lg-4 r4-b1'>
                                <DoughnutChart />
                            </div>
                            <div className='col-lg-8 r4-b2'>
                                <BarChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashBoard;