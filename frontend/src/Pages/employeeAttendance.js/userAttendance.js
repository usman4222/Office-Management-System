import React, { Fragment, useEffect, useState } from 'react';
// import './updateUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addNewUser, clearErrors } from '../../actions/addUserAction';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../../actions/updateUser';
import { UPDATE_USER_RESET } from '../../constants/updateUser';
import { updateUserCon } from '../../actions/attendanceAction';

const UpdateUser = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { error: updateError, isUpdated } = useSelector((state) => state.editUser)
    const { user } = useSelector((state) => state.getUser)


    const [date, setDate] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const [status, setStatus] = useState("");

    const roleCategories = [
        "Present",
        "Absent",
        "Leave",
    ]


    const userId = id;

    useEffect(() => {
        if (user && user._id === userId) {
            setDate(user.date)
            setStatus(user.status)
        } else {
            dispatch(getUserDetails(userId))
        }

        if (updateError) {
            enqueueSnackbar(updateError, { variant: 'error' });
            dispatch(clearErrors())
        }
        if (isUpdated) {
            enqueueSnackbar("Attendance Updated Successfully", { variant: 'success' });
            navigate('/')
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, enqueueSnackbar, updateError, isUpdated, userId, user])



    const updateUserHandler = (e, id) => {
        e.preventDefault();
        if (!status || status.trim() === '') {
            console.log('Status is empty or missing.');
            return;
        }
        dispatch(updateUserCon(id, { status, date }));
    }



    return (
        <Fragment>
            <div className='main-form'>
                <div className='addUser'>
                    <div className='addUser'>
                        <form
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={(e) => updateUserHandler(e, userId)}
                        >
                            <h2 >{user.name}'s Attendance</h2>
                            <input
                                type='date'
                                placeholder='Name'
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <select onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Choose Status</option>
                                {roleCategories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>

                            <div className='submitBtn'>
                                <button type='submit'>Mark</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;


