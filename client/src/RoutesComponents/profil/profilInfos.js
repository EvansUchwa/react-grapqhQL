import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProfilImage } from '../../Components/img'
import { setModalContentOnStore, setModalOnStore } from '../../Store/actions/modalActions';
import { UpdateProfilModal } from './updateModal';
import moment from "moment"
import 'moment/locale/fr'// without this line it didn't work
moment.locale('fr')

function ProfilInfos({ props }) {
    const { authInfos, profilInfos, refreshUser } = props;
    const dispatch = useDispatch()

    function updateUser() {
        dispatch(setModalContentOnStore(<UpdateProfilModal props={{ user: profilInfos, refreshUser }} />))
        dispatch(setModalOnStore(true))
    }
    return (
        <section className="pip-infos">
            <ProfilImage props={{ src: "default.png" }} />
            <h2>{profilInfos.username}</h2>
            <p>
                <b>Email :</b>
                {profilInfos.email}
            </p>
            <p>
                <b>A rejoint le : </b>
                {moment(profilInfos.createdAt).format('ll')}
            </p>
            {
                authInfos._id === profilInfos._id && <section>
                    <span onClick={() => updateUser()}>Modifier le profil</span>
                    <Link to={"/Movie/add"}>Ajouter un film</Link>
                </section>
            }

        </section>
    )
}

export default ProfilInfos
