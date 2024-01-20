// import React, { useEffect, Fragment, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { getUserAttendance } from '../../actions/attendanceAction';
// import { clearErrors } from '../../actions/addUserAction';
// import Sidebar from '../Sidebar';
// import Header from '../../components/Header';

// const AttendanceList = () => {
//     const dispatch = useDispatch();
//     const { enqueueSnackbar } = useSnackbar();
//     const { error, userAttendance } = useSelector((state) => state.userAttendance);
//     const { user } = useSelector((state) => state.getUser);
//     const attendanceArray = userAttendance.userAttendance || [];
//     const [attendanceDetails, setAttendanceDetails] = useState([]);


//     const userId = user ? user._id : '';

//     useEffect(() => {
//         if (userId) {
//             dispatch(getUserAttendance(userId));
//         }
//     }, [dispatch, userId]);


//     useEffect(() => {
//         if (userAttendance.userAttendance) {
//             setAttendanceDetails(userAttendance.userAttendance);
//         }
//     }, [userAttendance]);



//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     return (
//         <Fragment>
//             <div className='main'>
//                 <div className='row w-full main1-r1'>
//                     <div className='col-lg-2 main1-r1-b1'>
//                         <Sidebar />
//                     </div>
//                     <div className='col-lg-10 main1-r1-b2'>
//                         <div className='row'>
//                             <div className='col-lg-12'>
//                                 <Header />
//                             </div>
//                         </div>
//                         <div className='dashboard'>
//                             <div className='productsListContainer'>
//                                 <h1 className='productListHeading'>Attendance List</h1>
//                                 {attendanceArray.length > 0 ? (
//                                     <table className='table'>
//                                         <thead>
//                                             <tr>
//                                                 <th style={{ textAlign: 'center' }}>Number</th>
//                                                 <th style={{ textAlign: 'center' }}>Date</th>
//                                                 <th>Status</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {attendanceArray.map((detail, index) => (
//                                                 <tr key={index}>
//                                                     <td style={{ textAlign: 'center' }}>{index + 1}</td>
//                                                     <td style={{ textAlign: 'center' }}>{formatDate(detail.date)}</td>
//                                                     <td>{detail.status}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 ) : (
//                                     <p style={{ textAlign: 'center' }}>No attendance data available</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default AttendanceList;




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
    const { id } = useParams()
    const { user } = useSelector((state) => state.getUser);
    const { userAttendance } = useSelector((state) => state.userAttendance);
    const attendanceArray = userAttendance.userAttendance || [];
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const { attendanceId } = useParams()

    const userId = user ? user._id : '';

    const selectedAttendanceId = attendanceArray.length > 0
        ? attendanceArray.find((attendance) => {
            console.log('Attendance ID:', attendance._id);
            console.log('User ID:', userId);
            console.log('Param Attendance ID:', attendanceId);

            return attendance._id.trim() === (attendanceId ? attendanceId.trim() : '');
        })
        : null;

    console.log('Selected Attendance ID:', selectedAttendanceId);

    const userAttendanceId = selectedAttendanceId ? selectedAttendanceId._id : null;

    console.log('User Attendance ID:', userAttendanceId);




    useEffect(() => {
        if (userId) {
            dispatch(getUserAttendance(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
        }
    }, [userAttendance, attendanceArray]);

    useEffect(() => {
        if (userAttendance.userAttendance) {
            setAttendanceDetails(userAttendance.userAttendance);
        }
    }, [userAttendance]);




    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const deleteHandler = (id) => {
        // Implement your delete logic here
        console.log(`Deleting item with id ${id}`);
    };

    const rows = attendanceArray.map((detail, index) => ({
        id: index + 1,
        count: index + 1,
        date: detail.date,
        status: detail.status,
        userId: detail.userId, // Replace 'userId' with the actual property name in your data
        attendanceId: detail.attendanceId, // Replace 'attendanceId' with the actual property name in your data
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
        {
            field: 'action',
            headerName: 'Action',
            minWidth: 150,
            type: 'number',
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                // const { date, _id } = params.row; // Assuming your detail object has 'date' and '_id' properties

                return (
                    <Fragment>
                        <Link to={`/updateattendance/${userId}/${attendanceId}`} className='edit'>
                            <EditIcon />
                        </Link>
                    </Fragment>
                );
            },
        },
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
                                                <th>Action</th>
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
                                                    <td>
                                                        {/* RenderCell will automatically handle the actions */}
                                                        {columns[3].renderCell({ ...detail, id: index })}
                                                    </td>
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
