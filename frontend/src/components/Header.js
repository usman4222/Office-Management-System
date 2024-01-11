import React, { Fragment } from 'react'
import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import './Header.css'



const Header = () => {
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
                                <Link  to='/login'>
                                    <p>Login</p>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header