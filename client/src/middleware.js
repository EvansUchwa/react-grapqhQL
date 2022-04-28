import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import authSelector from "./Store/selectors/authSelector"

export const PcRoute = ({ props, children }) => {
    const { auth } = props;
    return <>
        {
            auth && auth.isLogged ? <Navigate to={"/Movie/list"} /> : children
        }
    </>
}

export const PvRoute = ({ props, children }) => {
    const { auth } = props;
    return <>
        {
            auth && auth.isLogged ? children : <Navigate to={"/Connexion"} />
        }
    </>
}