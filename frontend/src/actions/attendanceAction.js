import axios from 'axios';
import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_ATTENDANCE_DETAILS_REQUEST,
    USER_ATTENDANCE_DETAILS_SUCCESS,
    USER_ATTENDANCE_DETAILS_FAIL,
    CLEAR_ERRORS,
    UPDATE_USER_ATTENDANCE_REQUEST,
    UPDATE_USER_ATTENDANCE_SUCCESS,
    UPDATE_USER_ATTENDANCE_FAIL,
    GET_USER_ATTENDANCE_REQUEST,
    GET_USER_ATTENDANCE_SUCCESS,
    GET_USER_ATTENDANCE_FAIL,
} from '../constants/attendanceConstant';

export const updateUserCon = (id, attendanceData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const payload = {
            attendance: [
                {
                    status: attendanceData.status,
                    date: attendanceData.date
                }
            ]
        };

        const { data } = await axios.put(`http://localhost:4000/api/v1/attendance/${id}`, payload, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        });

        console.log('User updated successfully:', payload);
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        });
        console.log('Update error:', error.response || error.message || error);
    }
};



export const getUserAttendance = (id) => async (dispatch) => {

    try {
        dispatch({ type: GET_USER_ATTENDANCE_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/v1/getuserattendance/${id}`)

        console.log("This is user attenance data", data)

        dispatch({ type: GET_USER_ATTENDANCE_SUCCESS, payload: data.userAttendance })
    } catch (error) {
        dispatch({
            type: GET_USER_ATTENDANCE_FAIL,
            payload: error.response.data.message,
            message: "Error while getting details"
        })
    }
}



export const changeStatusAction = (userId, attendanceId, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_ATTENDANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`http://localhost:4000/api/v1/editsingleattendance/${userId}/${attendanceId}`, userData, config);

        dispatch({
            type: UPDATE_USER_ATTENDANCE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_ATTENDANCE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};


