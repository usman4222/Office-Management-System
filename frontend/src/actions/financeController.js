// Frontend action file (e.g., financeActions.js)
import {
    FINANCE_REQUEST,
    FINANCE_SUCCESS,
    FINANCE_FAIL,
    CLEAR_ERRORS,
    GET_ALL_EXPENSES_REQUEST,
    GET_ALL_EXPENSES_SUCCESS,
    GET_ALL_EXPENSES_FAIL,
    GET_CURRENT_MONTH_TOTAL_REQUEST,
    GET_CURRENT_MONTH_TOTAL_SUCCESS,
    GET_CURRENT_MONTH_TOTAL_FAIL,
    QR_REQUEST,
    QR_SUCCESS,
    QR_FAIL
} from "../constants/financeConstant";
import axios from "axios";

export const addNewExpense = (expense) => async (dispatch) => {
    try {
        dispatch({
            type: FINANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`http://localhost:4000/api/v1/finance`, expense, config);

        dispatch({
            type: FINANCE_SUCCESS,
            payload: data
        });

        dispatch(getAllExpenses());

        return data;
    } catch (error) {
        dispatch({
            type: FINANCE_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};




export const getAllExpenses = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_EXPENSES_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/allexpenses`);

        dispatch({ type: GET_ALL_EXPENSES_SUCCESS, payload: data.expenses });
    } catch (error) {
        dispatch({
            type: GET_ALL_EXPENSES_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};


export const getCurrentMonthExpenses = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CURRENT_MONTH_TOTAL_REQUEST });

        // const currentDate = new Date();
        // const month = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-indexed months
        // const year = currentDate.getFullYear();

        const { data } = await axios.get(`http://localhost:4000/api/v1/getExpenses`);

        console.log(data)

        dispatch({ type: GET_CURRENT_MONTH_TOTAL_SUCCESS, payload: data.totalMonthlyExpenses });
    } catch (error) {
        dispatch({
            type: GET_CURRENT_MONTH_TOTAL_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
