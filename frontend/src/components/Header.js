import React, { Fragment } from 'react'
import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import './Header.css'
import { useSelector } from 'react-redux'



const Header = () => {

    const { isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Fragment>
            <div>
                <div className='row main-r2'>
                    <div className='col-lg-12 main-r2-b1'>
                        <div className='header'>
                            <ul>
                                <Link to='/dash'>
                                    <p>DashBoard</p>
                                </Link>

                                {isAuthenticated
                                    ?
                                    <Link to='/logout'>
                                        Logout
                                    </Link>
                                    :
                                    <Link to='/login'>
                                    Login
                                </Link>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header