import React, { useEffect, useState, Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAttendanceDetails } from '../../actions/attendanceAction';
import { getUserDetails } from '../../actions/updateUser';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../Sidebar';
import { Doughnut } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';
import './Attendance.css'
import { Button } from '@material-ui/core';

const AttendanceDetails = () => {
    const { user } = useSelector((state) => state.getUser);
    const dispatch = useDispatch();
    const { id } = useParams();
    const params = useParams();
    const [showAttendance, setShowAttendance] = useState(false);
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [presentPercentage, setPresentPercentage] = useState(0);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [leaveCount, setLeaveCount] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);

    useEffect(() => {
        if (user && user.attendance && user.attendance.length > 0) {
            let presentCount = 0;
            let absentCount = 0;
            let leaveCount = 0;
            let totalEntries = user.attendance.length;

            const attendanceData = user.attendance.map((item, index) => {
                const id = uuidv4();
                const date = new Date(item.date).toLocaleDateString();
                const status = item.status;

                if (status === 'Present') {
                    presentCount++;
                } else if (status === 'Absent') {
                    absentCount++;
                } else if (status === 'Leave') {
                    leaveCount++;
                }

                return { id, date, status };
            });

            setAttendanceDetails(attendanceData);
            setShowAttendance(true);

            const percentage = (presentCount / totalEntries) * 100;
            setPresentPercentage(percentage);
            setPresentCount(presentCount);
            setAbsentCount(absentCount);
            setLeaveCount(leaveCount);
            setTotalEntries(totalEntries);
        }
    }, [user]);

    const DoughnutChart = () => {
        const data = {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [
                {
                    label: 'Views',
                    data: [presentCount, absentCount, leaveCount],
                    borderColor: ['rgb(62,12, 171)', 'rgb(214, 44, 129)'],
                    backgroundColor: ['rgba(62,12, 171, 0.3)', 'rgba(214, 44, 129, 0.3)'],
                    borderWidth: 1,
                },
            ],
        };
        return <Doughnut data={data} />;
    };

    const columns = [
        {
            field: 'date',
            headerName: 'Date',
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 10,
            flex: 0.5,
        },
    ];


    const rows = attendanceDetails.map((detail) => ({
        id: detail.id,
        date: detail.date,
        status: detail.status,
    }));


    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full'>
                    <div className='col-lg-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='productsListContainer'>
                            <h1 className='productListHeading'>{user.name}'s Attendance Details</h1>
                            <div className='row main-r1'>
                                <div className='col-lg-2 main-r1-2'>
                                    <p className='status'>Present</p>
                                    <p>{presentCount}</p>
                                </div>
                                <div className='col-lg-2 main-r1-b1'>
                                    <p className='status'>Absent</p>
                                    <p>{absentCount}</p>
                                </div>
                                <div className='col-lg-2 main-r1-2'>
                                    <p className='status'>Leave</p>
                                    <p>{leaveCount}</p>
                                </div>
                                <div className='col-lg-2 main-r1-b1'>
                                    <p className='status'>Total Days</p>
                                    <p>{totalEntries}</p>
                                </div>
                                <div className='col-lg-2 main-r1-2'>
                                    <p className='status'>Total Persentage</p>
                                    <p>{presentPercentage.toFixed(0)}%</p>
                                </div>
                                <div className='col-lg-2 main-r1-b1'>
                                    <Link to={`/attendancelist/${id}`}>
                                        <Button>Check Details</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='do'>
                                <div className=' doughnut'>
                                    <DoughnutChart className="dough" presentCount={presentCount} absentCount={absentCount} leaveCount={leaveCount} />
                                </div>
                            </div>
                        </div>
                        {/* <div className='row cv'>
                            <div className='col-lg-6'>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={100}
                                    disableSelectionOnClick
                                    className='productsListTable'
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}



export default AttendanceDetails

