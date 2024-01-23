import axios from "axios";
import {
    CREATE_REVENUE_FAIL,
    CREATE_REVENUE_REQUEST,
    CREATE_REVENUE_SUCCESS,
    GET_ALL_REVENUE_FAIL,
    GET_ALL_REVENUE_REQUEST,
    GET_ALL_REVENUE_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL,
    GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST,
    GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS
} from "../constants/revenue";




export const addNewRevenue = (revenue) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_REVENUE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`http://localhost:4000/api/v1/revenue`, revenue, config);

        dispatch({
            type: CREATE_REVENUE_SUCCESS,
            payload: data
        });

        // dispatch(getAllExpenses());

        return data;
    } catch (error) {
        dispatch({
            type: CREATE_REVENUE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};


export const getAllRevenue = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_REVENUE_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/allrevenues`);

        dispatch({ type: GET_ALL_REVENUE_SUCCESS, payload: data.revenues });
    } catch (error) {
        dispatch({
            type: GET_ALL_REVENUE_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};


export const getCurrentMonthRevenue = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REVENUE_FAIL, });

        const { data } = await axios.get(`http://localhost:4000/api/v1/currentmonthrevenue`);

        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REVENUE_REQUEST, payload: data.totalCurrentMonthExpenses });

    } catch (error) {
        dispatch({
            type: GET_CURRENT_MONTH_TOTAL_REVENUE_SUCCESS,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};