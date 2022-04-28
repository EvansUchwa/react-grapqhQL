import axios from "axios"

export function setIsLogged() {
    localStorage.setItem('gql-movies-isAuth', true)
    return {
        type: 'SET_IS_LOGGED'
    }
}

export function setIsDisconnect() {
    localStorage.removeItem('gql-movies-isAuth')
    localStorage.removeItem('gql-movies-token')
    return {
        type: 'SET_IS_DISCONNECT'
    }
}
export const getUser = (axiosReqUrl, token) => {

    return (dispatch) => {
        return axios.get(axiosReqUrl, { headers: { "Authorization": "Bearer " + token } })
            .then(res => {
                if (res.data._id) {
                    dispatch({
                        type: 'SET_LOGGED_INFOS',
                        payload: res.data,
                    })
                } else {
                    dispatch(setIsDisconnect())
                }
            })
            .catch(err => console.log(',shx'))

    }
}
