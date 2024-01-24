import axios from 'axios';
import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_USER_SINGLE_ATTENDANCE_REQUEST,
    GET_USER_SINGLE_ATTENDANCE_SUCCESS,
    GET_USER_SINGLE_ATTENDANCE_FAIL,
    CLEAR_ERRORS,
    UPDATE_USER_ATTENDANCE_REQUEST,
    UPDATE_USER_ATTENDANCE_SUCCESS,
    UPDATE_USER_ATTENDANCE_FAIL,
    GET_USER_ATTENDANCE_REQUEST,
    GET_USER_ATTENDANCE_SUCCESS,
    GET_USER_ATTENDANCE_FAIL,
} from '../constants/attendanceConstant';

let link = `http://localhost:4000/api/v1`

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

        const { data } = await axios.put(`${link}/attendance/${id}`, payload, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        });
        console.log('Update error:', error.response || error.message || error);
    }
};



export const getUserAttendance = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_ATTENDANCE_REQUEST });

        if (userId) {
            const { data } = await axios.get(`${link}/getuserattendance/${userId}`);
            dispatch({ type: GET_USER_ATTENDANCE_SUCCESS, payload: data });
        } else {
            throw new Error('User ID is undefined');
        }
    } catch (error) {
        dispatch({
            type: GET_USER_ATTENDANCE_FAIL,
            payload: error.response ? error.response.data.message : 'Error while getting details',
        });
    }
};




export const getSingleAttendanceDetails = (userId, attendanceId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_SINGLE_ATTENDANCE_REQUEST });

        const { data } = await axios.get(`${link}/getsingleattendance/${userId}/${attendanceId}`);

        dispatch({ type: GET_USER_SINGLE_ATTENDANCE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_USER_SINGLE_ATTENDANCE_FAIL,
            payload: (error.response && error.response.data) ? error.response.data : "Unknown error",
            message: "Error while getting details"
        });
    }
};






export const changeStatusAction = (userId, attendanceId, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_ATTENDANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.put(`${link}/editsingleattendance/${userId}/${attendanceId}`, userData, config);

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


