import React, { useState } from 'react'
import './RegisterLogin.css'



const RegisterLogin = () => {

    const [trans, setTrans] = useState(false);


    const regClick = () => {
        setTrans(true);
    };

    const logClick = () => {
        setTrans(false);
    }



    return (
        <div className='main-form'>
            <div className='login'>
                <div className={`login ${trans ? 'trans' : ''}`} onClick={logClick}>
                    <form>
                        <h2 className={trans ? 'scaleDown' : ''}>Log In</h2>
                        <input
                            type='text'
                            placeholder='Email'
                            id='loginEmail'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            id='loginPassword'
                            required
                        />

                        <div className='submitBtn'>
                            <button type='submit'>LogIn</button>
                        </div>
                    </form>

                </div>
                <div className={`register ${trans ? 'transformed' : ''}`} onClick={regClick}>
                    <form>
                        <h2>Register</h2>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            required
                        />
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            required
                        />
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            required
                        />
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
