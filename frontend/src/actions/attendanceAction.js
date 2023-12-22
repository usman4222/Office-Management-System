import axios from 'axios';
import {
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/attendanceConstant'; // Importing the action constants

// Action to create an attendance record
export const updateUserCon = (id, user) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_USER_REQUEST, })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`http://localhost:4000/api/v1/attendance/${id}`, user, config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
        console.log("user update successfully", user.data)
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
        console.log("this is update error", error)

    }
}


// Action to clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
