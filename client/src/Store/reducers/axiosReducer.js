const defaultAxios = {
    urlBase: process.env.NODE_ENV == "production" ? window.location.origin : "http://localhost:3610",
    headers: {}
}

const axiosReducer = (state = defaultAxios, action) => {
    switch (action.type) {
        case "SET_IS_LOGGED_HEADERS":
            return {
                ...state, headers: {
                    ...state.headers,
                    "Authorization": "Bearer " + action.payload
                }
            };
        default:
            return { ...state };
    }
}

export default axiosReducer;