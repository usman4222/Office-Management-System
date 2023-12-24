import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
} from '../constants/attendanceConstant';

// Attendance reducer function
export const userUpdateReducer = (state = { users: [] }, action) => {

  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false
      }
    case UPDATE_USER_FAIL:
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