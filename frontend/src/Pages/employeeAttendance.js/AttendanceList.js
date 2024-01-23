import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getUserAttendance } from '../../actions/attendanceAction';
import { clearErrors } from '../../actions/addUserAction';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';
import { Link, useParams } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const AttendanceList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.getUser);
    const { userAttendance } = useSelector((state) => state.userAttendance);
    const attendanceArray = userAttendance.userAttendance || [];
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [selectedAttendanceId, setSelectedAttendanceId] = useState('');
    const { id, attendanceId } = useParams();

    const userId = user ? user._id : '';  // Corrected line

    console.log('UserId:', userId);




    console.log('Attendance Array:', attendanceArray);

    // Get an array of all defined attendance IDs
    const allAttendanceIds = attendanceArray
        .map((detail) => detail._id) // Assuming that _id is the correct property
        .filter((attendanceId) => attendanceId !== undefined);

    console.log("All Attendance IDs:", allAttendanceIds);

    // // Assuming you want the first attendanceId
    // const firstAttendanceId = attendanceArray.length > 0 ? attendanceArray[0]._id : undefined;

    // console.log("First Attendance ID:", firstAttendanceId);
    const handleEditClick = (attendanceId) => {
        console.log("Clicked on Edit for attendanceId:", attendanceId);
        setSelectedAttendanceId(attendanceId);
        console.log("Selected Attendance ID:", selectedAttendanceId);
    };






    useEffect(() => {
        if (userId) {
            dispatch(getUserAttendance(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
            localStorage.setItem('userAttendance', JSON.stringify(userAttendance.userAttendance));
        }
    }, [userAttendance]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
        }
    }, [userAttendance]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const rows = attendanceArray.map((detail, index) => ({
        id: index + 1,
        count: index + 1,
        date: detail.date,
        status: detail.status,
        userId: detail.userId,
        attendanceId: detail.attendanceId,
    }))

    const columns = [
        {
            field: 'count',
            headerName: 'Number',
            minWidth: 10,
            flex: 0.5,
        },
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
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     minWidth: 150,
        //     type: 'number',
        //     sortable: false,
        //     flex: 0.5,
        //     renderCell: (params) => (
        //         <Fragment>
        //             {params.row && params.row.data && params.row.data.attendanceId !== undefined && (
        //                 <Link
        //                     to={`/updateattendance/${userId}/${params.row.data.attendanceId}`}
        //                     className='edit'
        //                 >
        //                     <EditIcon />
        //                 </Link>
        //             )}
        //         </Fragment>
        //     ),
            
            

        // },
    ];





    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full main1-r1'>
                    <div className='col-lg-2 main1-r1-b1'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10 main1-r1-b2'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='dashboard'>
                            <div className='productsListContainer'>
                                <h1 className='productListHeading'>Attendance List</h1>
                                {attendanceArray.length > 0 ? (
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>Number</th>
                                                <th style={{ textAlign: 'center' }}>Date</th>
                                                <th>Status</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceArray.map((detail, index) => (
                                                <tr key={index}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {formatDate(detail.date)}
                                                    </td>
                                                    <td>{detail.status}</td>
                                                    {/* <td>
                                                        {columns[3].renderCell({ ...detail, id: index })}
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p style={{ textAlign: 'center' }}>No attendance data available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AttendanceList;
