import React, { useEffect, Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { getUserAttendance } from '../../actions/attendanceAction';
import { clearErrors } from '../../actions/addUserAction';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';

const AttendanceList = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { error, userAttendanceDetails } = useSelector((state) => state.userAttendance);
    const { user } = useSelector((state) => state.getUser)

    // console.log(userAttendanceDetails)

    const userId = user ? user._id : '';
    // ...
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getUserAttendance(userId));
    }, [error, dispatch, enqueueSnackbar, userId]);



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
            minWidth: 100,
            type: 'number',
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Fragment>
                        {}
                    </Fragment>
                );
            },
        },
    ];

    const rows = []
    // userAttendanceDetails && userAttendanceDetails.map((detail, index) => ({
    //     id: index + 1,
    //     count: index + 1,
    //     date: detail.date,
    //     status: detail.status,
    // }))

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
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10} // Adjust the page size as needed
                                    disableSelectionOnClick
                                    className='productsListTable'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AttendanceList;
