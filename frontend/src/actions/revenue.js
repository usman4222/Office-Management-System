import axios from "axios";
import { CREATE_REVENUE_FAIL, CREATE_REVENUE_REQUEST, CREATE_REVENUE_SUCCESS } from "../constants/revenue";




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
