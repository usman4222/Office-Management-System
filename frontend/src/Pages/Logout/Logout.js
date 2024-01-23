import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import '../NotFound/NotFound.css';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const Logout = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logoutUser() {
        dispatch(logout());
        enqueueSnackbar('Logout Successfully', { variant: 'success' });
        navigate('/login'); 
    }

    return (
        <div className='pageNotFound'>
            <LuLogOut />
            <Typography>Are you sure to Logout...?</Typography>
            <Link onClick={logoutUser}>Logout</Link>
            <Link to='/dash'>Back to DashBoard</Link>
        </div>
    );
};

export default Logout;