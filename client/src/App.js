import { Routes, Route } from "react-router-dom";
import "./Assets/styles/materialdesignicons.min.css"
import "./Assets/styles/default/index.css"
import "./Assets/styles/default/utilClass.css"
import "./Assets/styles/default/form.css"
import "./Assets/styles/default/modal.css"

import "./Assets/styles/app.css"
import "./Assets/styles/home.css"
import "./Assets/styles/movie.css"
import "./Assets/styles/profil.css"



import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, setIsLogged } from "./Store/actions/authActions";
import authSelector from "./Store/selectors/authSelector";
import { PcRoute, PvRoute } from "./middleware";
import axiosSelector from "./Store/selectors/axiosSelector";
import { setIsLoggedHeaders } from "./Store/actions/axiosActions";
import LoggedNav from "./Components/nav";
import Profil from "./Routes/Profil";
import { Modal } from "./Components/Modal";

const routesArray = [
  { path: "/", comp: <Home props={{ authType: "Inscription" }} />, visibleOnAuth: false },
  { path: "/Connexion", comp: <Home props={{ authType: "Connexion" }} />, visibleOnAuth: false },

  { path: "/Movie/add", comp: <Movie props={{ action: "add" }} />, visibleOnAuth: true },
  { path: "/Movie/list", comp: <Movie props={{ action: "list" }} />, visibleOnAuth: true },
  { path: "/Movie/detail/:movieId", comp: <Movie props={{ action: "detail" }} />, visibleOnAuth: true },

  { path: "/Profil/", comp: <Profil />, visibleOnAuth: true },
  { path: "/Profil/:profilId", comp: <Profil />, visibleOnAuth: true },



  { path: "*", comp: <p>404</p> }
]
function App() {
  const loggedTokenOnStorage = localStorage.getItem('gql-movies-token')
  const isLoggedOnStorage = localStorage.getItem('gql-movies-isAuth')
  const axiosBase = useSelector(axiosSelector)
  const auth = useSelector(authSelector)
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedTokenOnStorage && isLoggedOnStorage) {
      dispatch(setIsLogged())
      dispatch(setIsLoggedHeaders(loggedTokenOnStorage))
      if (!auth._id) {
        dispatch(getUser(axiosBase.urlBase + "/api/auth/user", loggedTokenOnStorage))
      }
    }
  }, [])
  return (
    <div className="App">
      {
        auth && auth.isLogged && <LoggedNav />
      }

      <Modal />
      <Routes>
        {
          routesArray.map((rt, index) => <Route path={rt.path}
            element={rt.visibleOnAuth ? <PvRoute props={{ auth }}>
              {rt.comp}
            </PvRoute> : <PcRoute props={{ auth }}>
              {rt.comp}
            </PcRoute>}
            key={"rt nb" + index} />)
        }
      </Routes>
    </div >
  );
}

export default App;
