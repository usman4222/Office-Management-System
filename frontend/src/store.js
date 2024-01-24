import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    allAdminUsersReducer,
    deleteUserReducer,
    userReducer,
} from './reducers/userReducer';
import { addUserReducer } from './reducers/addUserReducer';
import { allUsersReducer } from './reducers/allUserReducer';
import { deleteReducer } from './reducers/deleteUser';
import { getUserReducer, updateUserDetails } from './reducers/updateUser';
import {
    getUserSingleAttendanceReducer,
    updateUserAttendance,
    userAttendanceReducer,
    userUpdateReducer
} from './reducers/attendanceReducer';
import {
    allExpensesReducer,
    currentMonthTotalReducer,
    financeReducer
} from './reducers/financeReducer';
import { allRevenuesReducer, currentMonthTotalRevenueReducer, revenueReducer } from './reducers/revenue';

const rootReducer = combineReducers({
    user: userReducer,
    adminUsers: allAdminUsersReducer,
    deleteUser: deleteUserReducer,
    newUser: addUserReducer,
    allUser: allUsersReducer,
    delUser: deleteReducer,
    getUser: getUserReducer,
    updateUser: updateUserDetails,
    userAttendance: userAttendanceReducer,
    changeAttendance: updateUserAttendance,
    singleAttendance: getUserSingleAttendanceReducer,
    editUser: userUpdateReducer,
    finance: financeReducer,
    allExpenses: allExpensesReducer,
    currentMonthTotal: currentMonthTotalReducer,
    revenue: revenueReducer,
    allRevenues: allRevenuesReducer,
    currentMonthRevenue: currentMonthTotalRevenueReducer
});

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancers);

export default store;
