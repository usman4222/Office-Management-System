import React, { useEffect } from 'react'
import '../AllUsers/AllUser.css'
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
import Sidebar from '../Sidebar'
import Header from '../../components/Header'
import { deleteUser, getAllAdminUsers } from '../../actions/userAction'
import { USER_DELETE_RESET } from '../../constants/userConstant'

const Admin = () => {

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { error, users } = useSelector((state) => state.adminUsers)
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.deleteUser)


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
            enqueueSnackbar('User deleted Successfully', { variant: 'success' });
            dispatch({ type: USER_DELETE_RESET })
        }
        dispatch(getAllAdminUsers())
    }, [alert, error, dispatch, deleteError, isDeleted, message]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const columns = [
        {
            field: "id",
            headerName: "Empolyee ID",
            minWidth: 10,
            flex: 0.8
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
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
            field: "action",
            headerName: "Action",
            minWidth: 100,
            type: "number",
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/updateuser/${params.getValue(params.id, "id")}`} className='edit'>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>

                    </Fragment>
                )
            }
        }
    ]

    const rows = users.map((item) => ({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email,
    }));


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
                                <Header/>
                            </div>
                        </div>
                        <div className='dashboard'>
                            <div className='productsListContainer'>
                                <h1 className='productListHeading'>All Users</h1>
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
                    </div>
                </div>
            </div>
        </Fragment>
    )
}



export default Admin
