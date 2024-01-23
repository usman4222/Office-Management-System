import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    UPDATE_USER_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
} from "../constants/userConstant";
import axios from "axios";




export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        // Make the login request
        const { data } = await axios.post(
            `http://localhost:4000/api/v1/login`,
            { email, password }
        );

        // Set the received token in localStorage with the name 'authToken'
        localStorage.setItem('authToken', data.token);

        // Set the token in the headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${ data.token}`;

        // Dispatch the success action with user data
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        // Dispatch the failure action with the error message
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};





export const register = (userData) => async (dispatch) => {


    try {
        dispatch({ type: REGISTER_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(
            `http://localhost:4000/api/v1/register`,
            userData,
            config
        );
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.data
        })
    }
}

export const logout = () => async (dispatch) => {

    try {
        await axios.get(`http://localhost:4000/api/v1/logout`)
        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllAdminUsers = () => async (dispatch) => {

    try {
        dispatch({ type: GET_ALL_USERS_REQUEST })

        const { data } = await axios.get(`http://localhost:4000/api/v1/allusers`)

        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })

        const { data } = await axios.delete(`http://localhost:4000/api/v1/deleteuser/${id}`)
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`http://localhost:4000/api/v1/user/${id}`, userData, config)
        console.log(userData)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {

        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
            message: "Error while getting update"
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}