import React, { useState, useRef, useEffect } from 'react'
import './RegisterLogin.css'
import FaceIcon from '@material-ui/icons/Face'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, login, register } from '../actions/userAction'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'


const RegisterLogin = () => {

    const [trans, setTrans] = useState(false);
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { error, isAuthenticated } = useSelector((state) => state.user)
    const loginTab = useRef(null)
    const navigate = useNavigate();
    const registerTab = useRef(null)
    const [loignEmail, setLoginEmail] = useState("")
    const [loignPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = user

    const registerDataChange = (e) => {
        console.log("Input changed!"); // Add this line to check if the function is triggered
        setUser(prevUser => {
            const updatedUser = { ...prevUser, [e.target.name]: e.target.value };
            console.log("Updated User State:", updatedUser);
            return updatedUser;
        });
    };


    // console.log("this is user", user)

    const regClick = () => {
        setTrans(true);
    };

    const logClick = () => {
        setTrans(false);
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loignEmail, loignPassword))
    }


    useEffect(() => {
        // && typeof error === 'object'
        if (error ) {
            enqueueSnackbar(`Invalid Credentials`, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            enqueueSnackbar('Successfully Logged In', { variant: 'success' });
            navigate("/");
        }
    }, [dispatch, error, isAuthenticated, navigate]);



    const registerSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            enqueueSnackbar('Password should be at least 8 characters long', { variant: 'error' });
            return;
        }

        if (name.length < 4) {
            enqueueSnackbar('Name should be at least 4 characters long', { variant: 'error' });
            return;
        }

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);

        try {
            // Log the formData before making the API call
            console.log("Request Body:", Object.fromEntries(myForm));

            const response = await dispatch(register(myForm));

            // Log the response from the server
             console.log("Response from Server:", response);

        } catch (error) {
            console.error('Registration Error:', error);
            enqueueSnackbar('Error occurred during registration', { variant: 'error' });
        }
    };





    return (
        <div className='main-form'>
            <div className='login'>
                <div className={`login ${trans ? 'trans' : ''}`} onClick={logClick}>
                    <form ref={loginTab} onSubmit={loginSubmit}>
                        <h2 className={trans ? 'scaleDown' : ''}>Log In</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={loignEmail}
                            required
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={loignPassword}
                            required
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />

                        <div className='submitBtn'>
                            <button type='submit'>LogIn</button>
                        </div>
                    </form>

                </div>
                <div className={`register ${trans ? 'transformed' : ''}`} onClick={regClick}>
                    <form
                        ref={registerTab}
                        encType='multipart/form-data'
                        onSubmit={registerSubmit}
                    >
                        <h2>Register</h2>
                        <div className='nameInput'>
                            {/* <FaceIcon /> */}
                            <input
                                type='text'
                                placeholder='Name'
                                value={user.name}
                                name='name'
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='emailInput'>
                            {/* <MailOutlineIcon /> */}
                            <input
                                type='email'
                                placeholder='Email'
                                value={user.email}
                                name='email' // Ensure this matches the state key
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='passInput'>
                            {/* <LockOpenIcon /> */}
                            <input
                                type='password'
                                placeholder='Password'
                                value={user.password}
                                name='password' // Ensure this matches the state key
                                required
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='submitBtn'>
                            <button type='submit'>Register</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default RegisterLogin
