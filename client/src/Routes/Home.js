import React, { useState } from 'react'
import { Form, InputPassword, InputText } from '../Components/form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import axiosSelector from '../Store/selectors/axiosSelector';
import { getError } from '../Assets/js/form';
import { Link } from 'react-router-dom';
import Login from '../RoutesComponents/home/login';
import SignUp from '../RoutesComponents/home/signUp';
import { getUser, setIsLogged } from '../Store/actions/authActions';
import { setIsLoggedHeaders } from '../Store/actions/axiosActions';
import { FormBtn } from '../Components/Button';

function Home({ props }) {
    const [formValues, setFormValues] = useState({
        username: "", email: "",
        password: "", confirmPassword: ""
    })
    const dispatch = useDispatch();
    const { authType } = props;
    const [errors, setErrors] = useState([]);
    const [authStatus, setAuthStatus] = useState(null)
    const [btnType, setBtnType] = useState('simple')
    const axiosBase = useSelector(axiosSelector).urlBase
    const axiosHeaders = useSelector(axiosSelector).headers

    async function submitFunction() {
        setBtnType('disableAndLoad')
        let reqUrlEnd = ""
        if (authType == "Connexion") {
            reqUrlEnd = "/api/auth/login"
        } else {
            reqUrlEnd = "/api/auth/signUp"
        }

        try {
            const authReq = await axios.post(axiosBase + reqUrlEnd, formValues);
            if (authType == "Connexion") {
                dispatch(setIsLogged())
                dispatch(setIsLoggedHeaders(authReq.data.token))
                dispatch(getUser(axiosBase + "/api/auth/user", authReq.data.token))
            }
            else {
                setAuthStatus({ status: "good", message: authReq.data.message })
            }

        } catch (error) {
            setAuthStatus({ status: "bad", message: error.response.data.message })
        }
        return setBtnType('simple')

    }
    function dispatchOtherAuthMessage() {
        if (authType == "Connexion") {
            return <p>Vous n'avez pas de compte ?
                <Link to={"/"}> Inscrivez vous !</Link>
            </p>
        } else {
            return <p>Vous avez deja un compte ?
                <Link to={"/Connexion"}> Connectez vous !</Link>
            </p>
        }
    }

    return (
        <div className='home'>
            <section>
                {
                    authType === "Inscription" && <p>
                        Hi ,Bienvenue sur <span>Wiki-Movie  </span>
                        la petite plateforme que j'ai developpé avec
                        React Js/Node Js/GraphQL/Mongo db pour etablir une encyclopedie des films.
                        Une fois inscris tu pourras te connecter et :
                        <ul>
                            <li>Ajouter des films</li>
                            <li>Liker/Disliker des films</li>
                            <li>Commenter des films ajoutez par  d'autre utilisateurs</li>
                            <li>Modifier ton profil</li>
                        </ul>
                    </p>
                }
                <h1>{authType}</h1>
                <Form props={{ submitFunction }}>
                    {
                        authType == "Connexion" ?
                            <Login props={{ formValues, setFormValues, errors, setErrors }} />
                            : <SignUp props={{ formValues, setFormValues, errors, setErrors }} />
                    }
                    <FormBtn props={{ content: authType, type: btnType }} />
                </Form>
                {authStatus != null && <AuthStatus props={{ authStatus }} />}

                <div className='otherAuthMsg'>
                    {
                        dispatchOtherAuthMessage()
                    }
                </div>
            </section>
        </div>
    )
}

const AuthStatus = ({ props }) => {
    const { authStatus } = props
    return <div className={'as-' + authStatus.status + ' authStatus'}>
        <b className=''>
            {authStatus.message}
        </b>
    </div>
}

export default Home
