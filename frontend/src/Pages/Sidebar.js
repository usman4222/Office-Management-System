import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { FaUser } from 'react-icons/fa';
import { PiUsersThreeFill } from "react-icons/pi";
import { HiCurrencyRupee } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuLogOut } from 'react-icons/lu';

const Sidebar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <div className="s-layout">
            <div className="s-layout__sidebar">
                <a className="s-sidebar__trigger" href="#0">
                    <i><FaBars /></i>
                </a>

                <nav className="s-sidebar__nav">
                    <div className='line'>
                        <div className='logo'>
                            <p>Soriic</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link className="s-sidebar__nav-link" to="/dash">
                                <DashboardIcon />Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="/adduser">
                                <FaUser />Add Employee
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="/allemployees">
                                <PeopleIcon />All Employees
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="/attendance">
                                <PiUsersThreeFill />Attendance
                            </Link>
                        </li>
                        {/* {isAuthenticated && user.role === "admin" && (
                            <> */}
                        <li>
                            <Link className="s-sidebar__nav-link" to="/finance">
                                <HiCurrencyRupee />Add Expense
                            </Link>
                        </li>
                        <li>
                            <Link className="s-sidebar__nav-link" to="/allexpenses">
                                <MdAdminPanelSettings />All Expenses
                            </Link>
                        </li>
                        {/* </>
                        )} */}
                        {isAuthenticated
                            ?
                            <li className='log'>
                                <Link className="s-sidebar__nav-link " to="/logout">
                                    <LuLogOut />Logout
                                </Link>
                            </li>
                            :
                            <p></p>}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
