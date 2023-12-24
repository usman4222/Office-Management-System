import React, { useEffect, useState, Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { getAttendanceDetails } from '../../actions/attendanceAction';
import { getUserDetails } from '../../actions/updateUser';
import { useParams } from 'react-router-dom';


const AttendanceDetails = () => {
    const { user } = useSelector((state) => state.getUser);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [showAttendance, setShowAttendance] = useState(false);
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [presentPercentage, setPresentPercentage] = useState(0);

    const userId = id;

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== userId;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(userId));
        }
    }, [dispatch, userId, user]);

    useEffect(() => {
        if (user && user.attendance && user.attendance.length > 0) {
            let presentCount = 0;
            let absentCount = 0;
            let leaveCount = 0;
            let presentPercentage = 0
            let totalEntries = user.attendance.length;

            const attendanceData = user.attendance.map((item, index) => {
                const id = index + 1;
                const date = new Date(item.date).toLocaleDateString();
                const status = item.status;

                if (status === 'Present') {
                    presentCount++;
                } else if (status === 'Absent') {
                    absentCount++;
                } else if (status === 'Leave') {
                    leaveCount++;
                }

                return { id: id.toString(), date, status };
            });

            setAttendanceDetails(attendanceData);
            setShowAttendance(true);

            const percentage = (presentCount / totalEntries) * 100;
            setPresentPercentage(percentage);

            setRows([
                {
                    id: user._id,
                    role: user.role,
                    designation: user.designation,
                    absentCount,
                    presentCount,
                    leaveCount,
                    totalEntries,
                    presentPercentage: percentage,
                },
            ]);
        }
    }, [user]);



    const columns = [

        {
            field: "designation",
            headerName: "Designation",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 10,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor" : "redColor"
            }
        },

        {
            field: "presentCount",
            headerName: "Present",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "leaveCount",
            headerName: "Leave",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "absentCount",
            headerName: "Absent",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "absentCount",
            headerName: "Absent",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "totalEntries",
            headerName: "Total Days",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "presentPercentage",
            headerName: "Present",
            minWidth: 10,
            flex: 0.5,
            valueGetter: (params) => {
                return presentPercentage.toFixed(2) + "%";
            }
        },
    ]


    return (
        <Fragment>
            <div className='productsListContainer'>
                <h1 className='productListHeading'>{user.name}'s Attendance Details</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productsListTable'
                    autoHeight
                />
                {showAttendance && (
                    <div style={{ marginTop: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f0f0f0' }}>
                                    <th style={{ padding: '10px', }}>Date</th>
                                    <th style={{ padding: '10px', }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceDetails.map((detail, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{detail.date} </td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>{detail.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Fragment>
    )
}



export default AttendanceDetails