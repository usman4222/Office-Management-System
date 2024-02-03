import React, { Fragment } from 'react'
import ErrorIcon from "@material-ui/icons/Error"
import { MdDashboard } from "react-icons/md";
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './NotFound.css'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader';

const NotFound = () => {

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);


  return (
    <Fragment>
      {loading ? <Loader /> : (
        <div className='pageNotFound'>
          {isAuthenticated ? <MdDashboard /> : <ErrorIcon />}
          {isAuthenticated ? <Typography>Wellcome to DashBoard</Typography> : <Typography>Page Not Found</Typography>}
          {isAuthenticated ? <Link to='/'>DashBoard</Link> : <Link to='/login'>DashBoard</Link>}
        </div>
      )}
    </Fragment>
  )
}

export default NotFound
