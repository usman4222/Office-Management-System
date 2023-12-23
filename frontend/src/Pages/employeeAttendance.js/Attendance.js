import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers, clearErrors } from '../../actions/addUserAction';
import { deleteUser } from '../../actions/deleteUser';
import { DELETE_USER_RESET } from '../../constants/deleteUserConstant';

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
      field: "id",
      headerName: "Empolyee ID",
      minWidth: 10,
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 10,
      flex: 0.5,
    },
    {
      field: 'Attendance',
      headerName: 'Employee Attendance',
      minWidth: 10,
      flex: 0.8,
      renderCell: (params) => (
        <Link to={`/attendance/${params.getValue(params.id, "id")}`}>
          <Button>
            Mark Attendance
          </Button>
        </Link>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 10,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      type: "number",
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/attendance/view/${params.getValue(params.id, "id")}`}>
          <Button>
            View Attendance
          </Button>
        </Link>
      ),
    },
  ];

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
          <h1 className='productListHeading'>Employee Attendance</h1>
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
  );
};

export default Attendance;
