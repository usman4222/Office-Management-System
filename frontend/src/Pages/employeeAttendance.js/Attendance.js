import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { getAllUsers, clearErrors } from '../../actions/addUserAction';
import { deleteUser } from '../../actions/deleteUser';
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant';
import Sidebar from '../Sidebar';
import Header from '../../components/Header';

const Attendance = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, users } = useSelector((state) => state.allUser);
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.delUser);

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
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [error, dispatch, deleteError, isDeleted, message, enqueueSnackbar]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      field: "index",
      headerName: "Index",
      minWidth: 10,
      flex: 0.4,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 10,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 10,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: 'Attendance',
      headerName: 'Employee Attendance',
      minWidth: 10,
      flex: 0.6,
      renderCell: (params) => (
        <Link to={`/attendance/${params.getValue(params.id, "id")}`}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#344854',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              transition: 'background-color 0.3s ease',
              marginTop: '-20px',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            }}
          >
            Mark Attendance
          </Button>
        </Link>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/attendance/view/${params.getValue(params.id, "id")}`}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#344854',
              color: '#ffffff',
              padding: '10px ',
              borderRadius: '5px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 'none',
              transition: 'background-color 0.3s ease',
              marginTop: '-20px',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            }}
          >
            View Attendance
          </Button>
        </Link>
      ),
    },
  ];

  const rows = users.map((item, index) => ({
    id: item._id,
    index: index + 1,
    name: item.name,
    role: item.role,
    fatherName: item.fatherName,
    designation: item.designation,
    phone: item.phone,
    address: item.address,
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
            <div className='dashboard'>
              <div className='productsListContainer'>
                <h1 className='productListHeading'>Employee Attendance</h1>
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
  );
};

export default Attendance;
