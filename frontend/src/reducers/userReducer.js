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
} from "../constants/userConstant"


export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }

}


 export const allAdminUsersReducer = (state = { users: [] }, action) => {

        switch (action.type) {
            case GET_ALL_USERS_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
            case GET_ALL_USERS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    users: action.payload
                }
            case GET_ALL_USERS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                };
            default:
                return state
        }
    }