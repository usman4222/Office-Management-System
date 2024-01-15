import { combineReducers, applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
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
import { userUpdateReducer } from './reducers/attendanceReducer';
import {
    allExpensesReducer,
    currentMonthTotalReducer,
    financeReducer,
} from './reducers/financeReducer';

const rootReducer = combineReducers({
    user: userReducer,
    adminUsers: allAdminUsersReducer,
    deleteUser: deleteUserReducer,
    newUser: addUserReducer,
    allUser: allUsersReducer,
    delUser: deleteReducer,
    getUser: getUserReducer,
    updateUser: updateUserDetails,
    editUser: userUpdateReducer,
    finance: financeReducer,
    allExpenses: allExpensesReducer,
    currentMonthTotal: currentMonthTotalReducer,
});

const middleware = [thunk];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, composedEnhancers);

export default store;
