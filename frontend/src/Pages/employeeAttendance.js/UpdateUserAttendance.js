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
import { changeStatusAction, getSingleAttendanceDetails } from '../../actions/attendanceAction';
import { v4 as uuidv4 } from 'uuid';

const UpdateUserAttendance = () => {

    const dispatch = useDispatch();
    const { userAttendance } = useSelector((state) => state.userAttendance);
    const { user } = useSelector((state) => state.getUser);
    const attendanceArray = userAttendance.userAttendance || [];
    const { userId, attendanceId } = useParams();
    const { id } = useParams();

    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const allAttendanceIds = attendanceArray.map(entry => entry._id);
    console.log("All Attendance IDs:", allAttendanceIds);

    console.log("Attendance Array:", attendanceArray);
    console.log('User ID:', userId);
    console.log('Param Attendance ID:', attendanceId);

    const selectedAttendanceId = attendanceArray.find((attendance) => attendance._id === attendanceId);
    console.log('Selected Attendance ID:', selectedAttendanceId);

    const userAttendanceId = selectedAttendanceId ? selectedAttendanceId._id : null;
    console.log('User Attendance ID:', userAttendanceId);

    useEffect(() => {
        console.log("User ID:", userId);
        console.log("Attendance ID:", attendanceId);
      
        if (userId && attendanceId) {
          dispatch(getSingleAttendanceDetails(userId, attendanceId));
        } else {
          console.error("Invalid userId or attendanceId:", userId, attendanceId);
        }
      }, [dispatch, userId, attendanceId]);
      
    

    const roleCategories = [
        "Present",
        "Absent",
        "Leave",
    ];

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
                            {/* <h1 className='productListHeading'>{user.name}'s Attendance Details</h1> */}
                            <div className='addUser'>
                                <form
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                // onSubmit={updateUserHandler}
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


