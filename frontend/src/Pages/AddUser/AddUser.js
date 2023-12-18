import React, { Fragment, useEffect, useState } from 'react'
import './AddUser.css'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack'
import { ADD_USER_RESET } from '../../constants/addUserContant';
import { addNewUser, clearErrors } from '../../actions/addUserAction';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [role, setRole] = useState("");
    const [skill, setSkill] = useState("");
    const { error, success } = useSelector((state) => state.newUser)

    const roleCategories = [
        "Employe",
        "Admin"
    ]

    const skillCategories = [
        "Web Deveploper",
        "Mobile App Developer",
        "WorldPress Developer",
        "SEO",
        "HR Manager",
        "Project Manager",
        "Video Editor",
        "Content Writer",
        "Digital Marketer"
    ]

    const addUserHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("fatherName", fatherName);
        myForm.set("address", address);
        myForm.set("phone", phone);
        myForm.set("role", role); // Ensure 'role' is correctly set
        myForm.set("userType", skill); // Ensure 'userType' (or 'skill') is correctly set
        dispatch(addNewUser(myForm));
    };

  



    useEffect(() => {
        if (error) {
            alert.error(error)
            enqueueSnackbar(error, { variant: 'success' });
            dispatch(clearErrors())
        }
        if (success) {
            enqueueSnackbar('User created Successfully', { variant: 'success' });
            navigate('/')
            dispatch({ type: ADD_USER_RESET })
        }
    }, [dispatch, error, success])


    return (
        <Fragment>
            <div className='main-form'>
                <div className='addUser'>
                    <div className='addUser'>
                        <form
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={addUserHandler}
                        >
                            <h2 >Add User</h2>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Father Name'
                                required
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Phone'
                                pattern='[0-9]*'
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <select onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                {roleCategories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                            <select onChange={(e) => setSkill(e.target.value)}>
                                <option value="">Choose Skill</option>
                                {skillCategories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
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


