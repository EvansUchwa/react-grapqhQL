import axios from "axios";

const defaultAuthState = { isLogged: false, loggedInfos: null }

const authReducer = (state = defaultAuthState, action) => {
    switch (action.type) {
        case "SET_IS_LOGGED":
            return { isLogged: true, loggedInfos: null };
        case "SET_LOGGED_INFOS":
            return { isLogged: true, loggedInfos: action.payload };
        case "SET_IS_DISCONNECT":
            return defaultAuthState;
        default:
            return { ...state };
    }
}



export default authReducer;