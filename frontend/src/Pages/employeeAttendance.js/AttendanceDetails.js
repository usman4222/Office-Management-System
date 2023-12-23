import React, { useEffect } from 'react'
import { Fragment, usseEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
// import { Metadata } from '@stripe/stripe-js'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { useSnackbar } from 'notistack'
import { getAllUsers, clearErrors, } from '../../actions/addUserAction'
import { deleteUser } from '../../actions/deleteUser'
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant'

const AttendanceDetails = () => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { error, users } = useSelector((state) => state.allUser)
    const { user } = useSelector((state) => state.getUser)
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.delUser)


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            // history.push('/admin/users')
            enqueueSnackbar('User deleted Successfully', { variant: 'success' });
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers());
    }, [alert, error, dispatch, deleteError, isDeleted, message]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

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
            field: "present",
            headerName: "Present",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "leave",
            headerName: "Leave",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "absent",
            headerName: "Absent",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "persent",
            headerName: "Attendance Percentage",
            minWidth: 10,
            flex: 0.5
        },
    ]

    const rows = users.map((item) => ({
        id: item._id,
        name: item.name,
        role: item.role,
        fatherName: item.fatherName,
        designation: item.designation,
        phone: item.phone,
        address: item.address,
    }));

    return (
        <Fragment>
            {/* <MetaData title="ALL USERS -- ADMIN" /> */}
            <div className='dashboard'>
                {/* <Sidebar /> */}
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
                </div>
            </div>
        </Fragment>
    )
}



export default AttendanceDetails
