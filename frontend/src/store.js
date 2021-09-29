import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { 
  blogListReducer, 
  blogCreateReducer, 
  blogDetailReducer, 
  blogUpdateReducer
} from "./reducers/blogReducers";

const reducer = combineReducers({
  blogList: blogListReducer,
  blogCreate: blogCreateReducer,
  blogDetail: blogDetailReducer,
  blogUpdate: blogUpdateReducer
})

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
