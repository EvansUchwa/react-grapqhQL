import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { setIsDisconnect } from "../Store/actions/authActions";
import authSelector from "../Store/selectors/authSelector";
import { MyLinkOrBtnDropDown } from "./Other";

const LoggedNav = () => {
    const dispatch = useDispatch();
    function disconnect() {
        dispatch(setIsDisconnect())
    }
    const auth = useSelector(authSelector)
    const authLinksOrBtnArray = [
        <Link to="/Profil">Mon profil</Link>,
        <span onClick={() => disconnect()}>Se deconnecter</span>
    ]
    return <nav>
        <b className="navLogo">Wiki-Movie</b>

        {
            auth && auth.isLogged && <>
                <MyLinkOrBtnDropDown props={{
                    customClass: "navAuth",
                    letter: 'I', linksOrBtns: authLinksOrBtnArray
                }} />
                {/* <div className=" myDropdown">
                    <Link to="/Profil">P</Link>
                </div> */}
                <p className="navDisconnect">
                    <i className="mdi mdi-logout" onClick={() => disconnect()}></i>
                </p>
            </>
        }
    </nav>
}

export default LoggedNav;