// Frontend action file (e.g., financeActions.js)
import {
    FINANCE_REQUEST,
    FINANCE_SUCCESS,
    FINANCE_FAIL,
    CLEAR_ERRORS
} from "../constants/financeConstant";
import axios from "axios";

export const addNewExpense = ({ text, name, date }) => async (dispatch) => {
    try {
        dispatch({
            type: FINANCE_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        // Validate that all required fields are present before making the request
        if (!text || !name || !date) {
            throw new Error('Missing required fields');
        }

        const payload = {
            name,
            text,
            date
        };

        const { data } = await axios.post(`http://localhost:4000/api/v1/finance`, payload, config);

        dispatch({
            type: FINANCE_SUCCESS,
            payload: data
        });

        return data;
    } catch (error) {
        dispatch({
            type: FINANCE_FAIL,
            payload: error.response ? error.response.data.message : error.message
        });

        throw error;
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
