import React, { useEffect } from 'react'
import './AllUser.css'
import { Fragment} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
// import { Metadata } from '@stripe/stripe-js'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { useSnackbar } from 'notistack'
import { getAllUsers, clearErrors, } from '../../actions/addUserAction'
import { deleteUser } from '../../actions/deleteUser'
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant'
import Sidebar from '../Sidebar'
import Header from '../../components/Header'

const AllUser = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const { error, users } = useSelector((state) => state.allUser)
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
    }, [enqueueSnackbar, error, dispatch, deleteError, isDeleted, message]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const columns = [
        {
            field: "index",
            headerName: "Index",
            minWidth: 10,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "fatherName",
            headerName: "F-Name",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "phone",
            headerName: "Phone",
            minWidth: 10,
            flex: 0.5
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 10,
            flex: 0.5
        },
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

    const rows = users.map((item, index) => ({
        index: index + 1,
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
            <div className='main' method="GET">
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
                                <h1 className='productListHeading'>All Employees</h1>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={100}
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



export default AllUser
