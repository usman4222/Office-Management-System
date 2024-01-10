import React, { Fragment } from 'react'
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
import { FaUser } from 'react-icons/fa';
import { PiUsersThreeFill } from "react-icons/pi";
import { HiCurrencyRupee } from "react-icons/hi2";
import './Sidebar.css'

const Sidebar = () => {
    return (
        // <div className='sidebar'>
        //     <Link to="/">
        //         {/* <img src={logo} alt='Ecommerce'/> */}
        //     </Link>
        //     <Link to="/user">
        //         <p>
        //             <DashboardIcon /> Dashboard
        //         </p>
        //     </Link>
        //     <Link to="/adduser">
        //         <p>
        //         <FaUser />Add New 
        //         </p>
        //     </Link>
        //     <Link to="allusers">
        //         <p>
        //             <ListAltIcon />All Users 
        //         </p>
        //     </Link>
        //     <Link to="/attendance">
        //         <p>
        //             <PeopleIcon /> Attendance 
        //         </p>
        //     </Link>
        //     <Link to="/finance">
        //         <RateReviewIcon /> Add Expenses 
        //     </Link>
        // </div>
        <Fragment>
            <div className='sidebar'>
                <div>
                    <div className='line'>
                        <div className='logo'>
                            <p>Soriic</p>
                        </div>
                        <br />
                    </div>
                    <div>
                        <div className='actions'>
                            <div className='icon'>
                                <Link to='/'>
                                    <p>
                                        <DashboardIcon />Dashboard
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/'>
                                    <p>
                                        <FaUser />Add Employee
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/'>
                                    <p>
                                        <PeopleIcon />All Employees
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/'>
                                    <p>
                                        <PiUsersThreeFill />Attendance
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/'>
                                    <p>
                                        <HiCurrencyRupee />Finance
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar
