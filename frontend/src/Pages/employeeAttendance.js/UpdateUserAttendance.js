import React, { Fragment, useEffect, useState } from 'react';
// import '../UpdateUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addNewUser, clearErrors } from '../../actions/addUserAction';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../../actions/updateUser';
import { UPDATE_USER_RESET } from '../../constants/updateUser';
import Header from '../../components/Header';
import Sidebar from '../Sidebar';
import { UPDATE_USER_ATTENDANCE_RESET } from '../../constants/attendanceConstant';
import { changeStatusAction } from '../../actions/attendanceAction';
import { v4 as uuidv4 } from 'uuid';

const UpdateUserAttendance = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { error: updateError, isUpdated } = useSelector((state) => state.changeAttendance)
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

    // console.log("This is user att", user.attendance )

    useEffect(() => {
        const isUserDataIncomplete = !user || user._id !== id;

        if (isUserDataIncomplete) {
            dispatch(getUserDetails(id));
        }
    }, [dispatch, id, user]);

    useEffect(() => {
        if (user && user.attendance && user.attendance.length > 0) {
            const attendanceData = user.attendance.map((item, index) => {
                const id = uuidv4();
                const date = new Date(item.date).toLocaleDateString();
                const status = item.status;
    
                return { id, date, status };
            });

            // setAttendanceDetails(attendanceData);
            // setShowAttendance(true);
        }
    }, [user]);


    useEffect(() => {
        if (user && user._id === userId) {
            setDate(user.date)
            setStatus(user.status)
        } else {
            dispatch(getUserDetails(userId))
        }

        if (updateError) {
            enqueueSnackbar(updateError, { variant: 'success' });
            dispatch(clearErrors())
        }
        if (isUpdated) {
            enqueueSnackbar("Attendance Updated Successfully", { variant: 'success' });
            navigate('/')
            dispatch({ type: UPDATE_USER_ATTENDANCE_RESET })
        }
    }, [dispatch, enqueueSnackbar, updateError, isUpdated, userId, user])



    const updateUserHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("date", date)
        myForm.set("status", status)
        dispatch(changeStatusAction(userId, myForm))

    }

    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full'>
                    <div className='col-lg-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='main-form'>
                        <h1 className='productListHeading'>{user.name}'s Attendance Details</h1>
                            <div className='addUser'>
                                <form
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateUserHandler}
                                >
                                    <h2 >Update Attendance</h2>
                                    <input
                                        type='date'
                                        placeholder='Date'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Mark</option>
                                        {roleCategories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                    <div className='submitBtn'>
                                        <button type='submit'>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUserAttendance;


