import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import configureS
import authReducer from "./reducers/authReducer";
import axiosReducer from "./reducers/axiosReducer";
import thunk from "redux-thunk"
import { modalReducer } from "./reducers/modalReducer";

// const devTools = process.env.NODE_ENV === 'development' ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
const reduxStore = createStore(
    combineReducers({ auth: authReducer, axios: axiosReducer, modal: modalReducer }),
    compose(applyMiddleware(thunk))
)
// window.__REDUX_DEVTOOLS_EXTENSION__
//     && window.__REDUX_DEVTOOLS_EXTENSION__()
export default reduxStore;


