import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CLEAR_ERRORS,
  UPDATE_USER_ATTENDANCE_REQUEST,
  UPDATE_USER_ATTENDANCE_SUCCESS,
  UPDATE_USER_ATTENDANCE_RESET,
  UPDATE_USER_ATTENDANCE_FAIL,
  GET_USER_ATTENDANCE_REQUEST,
  GET_USER_ATTENDANCE_SUCCESS,
  GET_USER_ATTENDANCE_FAIL,
  GET_USER_SINGLE_ATTENDANCE_REQUEST,
  GET_USER_SINGLE_ATTENDANCE_SUCCESS,
  GET_USER_SINGLE_ATTENDANCE_FAIL,
} from '../constants/attendanceConstant';

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

const storedAttendance = JSON.parse(localStorage.getItem('userAttendance'));

const initialState = {
  loading: false,
  userAttendance: {
    userAttendance: storedAttendance || [], 
  },
  error: null,
};

export const userAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ATTENDANCE_SUCCESS:
      return {
        loading: false,
        userAttendance: action.payload, 
        error: null,
      };
    case GET_USER_ATTENDANCE_FAIL:
      return {
        loading: false,
        userAttendance: [],
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};




export const getUserSingleAttendanceReducer = (state = { singleAttendance: {} }, action) => {
  switch (action.type) {
    case GET_USER_SINGLE_ATTENDANCE_REQUEST:
      console.log('GET_USER_SINGLE_ATTENDANCE_REQUEST');
      return {
        ...state,
        loading: true
      };
    case GET_USER_SINGLE_ATTENDANCE_SUCCESS:
      console.log('GET_USER_SINGLE_ATTENDANCE_SUCCESS', action.payload);
      return {
        loading: false,
        singleAttendance: action.payload
      };
    case GET_USER_SINGLE_ATTENDANCE_FAIL:
      console.log('GET_USER_SINGLE_ATTENDANCE_FAIL', action.payload);
      return {
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      console.log('CLEAR_ERRORS');
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};





export const updateUserAttendance = (state = {}, action) => {

  switch (action.type) {
    case UPDATE_USER_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case UPDATE_USER_ATTENDANCE_RESET:
      return {
        ...state,
        isUpdated: false
      };
    case UPDATE_USER_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};