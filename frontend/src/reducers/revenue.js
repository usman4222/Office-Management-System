import { CLEAR_ERRORS } from "../constants/financeConstant";
import { CREATE_REVENUE_FAIL, CREATE_REVENUE_REQUEST, CREATE_REVENUE_RESET, CREATE_REVENUE_SUCCESS } from "../constants/revenue";






export const revenueReducer = (state = { revenue: [] }, action) => {

    switch (action.type) {
        case CREATE_REVENUE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_REVENUE_SUCCESS:
            return {
                ...state,
                loading: false,
                revenue: action.payload.revenue,
            }
        case CREATE_REVENUE_RESET:
            return {
                ...state,
                success: false
            };
        case CREATE_REVENUE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
