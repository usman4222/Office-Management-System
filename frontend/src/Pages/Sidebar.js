import React from 'react'
import { Link } from 'react-router-dom'
// import { TreeItem, TreeView } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AddIcon from '@material-ui/icons/Add'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import ListAltIcon from '@material-ui/icons/ListAlt'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import RateReviewIcon from '@material-ui/icons/RateReview'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/">
                {/* <img src={logo} alt='Ecommerce'/> */}
            </Link>
            <Link to="/user">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>
            <Link to="/adduser">
                <p>
                <PeopleIcon />Add New 
                </p>
            </Link>
            <Link to="allusers">
                <p>
                    <ListAltIcon />All Users 
                </p>
            </Link>
            <Link to="/attendance">
                <p>
                    <PeopleIcon /> Attendance 
                </p>
            </Link>
            <Link to="/">
                <RateReviewIcon /> New 
            </Link>
        </div>
    )
}

export default Sidebar
