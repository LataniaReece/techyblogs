import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {globalAlertReducer } from './reducers/globalAlertReducer';
import { 
  blogListReducer, 
  blogCreateReducer, 
  blogDetailReducer, 
  blogUpdateReducer,
  blogDeleteReducer
} from "./reducers/blogReducers";

import { 
  userLoginReducer, 
  userRegisterReducer,
  userLogoutReducer
} from './reducers/userReducers';

const reducer = combineReducers({
  blogList: blogListReducer,
  blogCreate: blogCreateReducer,
  blogDetail: blogDetailReducer,
  blogUpdate: blogUpdateReducer,
  blogDelete: blogDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userLogout: userLogoutReducer,
  globalAlert: globalAlertReducer,
})

let userInfoFromStorage 
let alertFromStorage

if (localStorage.getItem('userInfo') !== "undefined" && localStorage.getItem('userInfo') !== null) {
  userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
} else {
  userInfoFromStorage = null
}

if (localStorage.getItem('alert') !== "undefined" && localStorage.getItem('alert') !== null) {
  alertFromStorage = JSON.parse(localStorage.getItem('alert'))
} else {
  alertFromStorage = null
}

const initialState = {userLogin: { userInfo: userInfoFromStorage }, globalAlert: { alert: alertFromStorage}};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
