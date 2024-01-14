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
import { MdAdminPanelSettings } from "react-icons/md";
import './Sidebar.css'

const Sidebar = () => {
    return (
        <Fragment>
            <div className='sidebar'>
                <div>
                    <div className='line'>
                        <div className='logo'>
                            <p>Soriic</p>
                        </div>
                    </div>
                    <div>
                        <div className='actions'>
                            <div className='icon'>
                                <Link to='/dash'>
                                    <p>
                                        <DashboardIcon />Dashboard
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/adduser'>
                                    <p>
                                        <FaUser />Add Employee
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/allusers'>
                                    <p>
                                        <PeopleIcon />All Employees
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/attendance' >
                                    <p>
                                        <PiUsersThreeFill />Attendance
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/finance'>
                                    <p>
                                        <HiCurrencyRupee />Add Expense
                                    </p>
                                </Link>
                            </div>
                            <div className='icon'>
                                <Link to='/allexpenses'>
                                    <p>
                                        <MdAdminPanelSettings />All Expenses
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
