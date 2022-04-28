export function setIsLoggedHeaders(token) {
    localStorage.setItem("gql-movies-token", token)

    return {
        type: "SET_IS_LOGGED_HEADERS",
        payload: token
    }
}