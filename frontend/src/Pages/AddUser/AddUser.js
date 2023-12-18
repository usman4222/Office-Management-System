import React, { Fragment } from 'react'
import './AddUser.css'

const AddUser = () => {
    return (
        <Fragment>
            <div className='main-form'>
                <div className='login'>
                    <div className='login'>
                        <form >
                            <h2 >Log In</h2>
                            <h2 >Add User</h2>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Father Name'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Address'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Phone'
                                pattern='[0-9]*'
                                required
                            />
                            <select>
                                <option>Role</option>
                                <option value="Employe">Employe</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <select>
                                <option>Skill</option>
                                <option value="Employe">Web Developer</option>
                                <option value="Admin">Mobile App Developer</option>
                                <option value="Admin">Worldpress Developer</option>
                                <option value="Admin">Content Writer</option>
                                <option value="Admin">Video Editor</option>
                                <option value="Admin">HR Manager</option>
                                <option value="Admin">SEO</option>
                                <option value="Admin">Project Manager</option>
                                <option value="Admin">Digital Marketer</option>
                            </select>

                            <div className='submitBtn'>
                                <button type='submit'>Add User</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default AddUser;


{/* <div className='main-form'>
                <div className='login'>
                    <div className="Login">
                        <form >
                            <h2 >Add User</h2>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Father Name'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Address'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Phone'
                                pattern='[0-9]*'
                                required
                            />
                            <select>
                                <option>Choose Category</option>
                                <option value="Employe">Employe</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <select>
                                <option>Choose Category</option>
                                <option value="Employe">Web Developer</option>
                                <option value="Admin">Mobile App Developer</option>
                                <option value="Admin">Worldpress Developer</option>
                                <option value="Admin">Content Writer</option>
                                <option value="Admin">Video Editor</option>
                                <option value="Admin">HR Manager</option>
                                <option value="Admin">SEO</option>
                                <option value="Admin">Project Manager</option>
                                <option value="Admin">Digital Marketer</option>
                            </select>
                            <div className='submitBtn'>
                                <button type='submit'>Create</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div> */}