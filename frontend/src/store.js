import { combineReducers, applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { addUserReducer } from './reducers/addUserReducer';

const rootReducer = combineReducers({
    user: userReducer,
    newUser: addUserReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
