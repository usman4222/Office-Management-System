import axios from 'axios';
import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    CLEAR_ERRORS
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

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};


