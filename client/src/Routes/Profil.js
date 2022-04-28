import { useQuery } from '@apollo/client';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { GET_USER } from '../Gqls/user';
import ProfilInfos from '../RoutesComponents/profil/profilInfos';
import ProfilPosts from '../RoutesComponents/profil/profilPosts';
import authSelector from '../Store/selectors/authSelector';

function Profil() {
    const { profilId } = useParams();
    const auth = useSelector(authSelector)
    const authInfos = auth && auth.loggedInfos && auth.loggedInfos
    const authedId = authInfos && authInfos._id;

    // Get User By GraphQL req
    const getUserInfosReq = useQuery(GET_USER, { variables: { id: profilId ? profilId : authedId } })
    const getUserInfosLoading = getUserInfosReq.loading;
    const getUserInfos = !getUserInfosLoading && getUserInfosReq.data && getUserInfosReq.data.user;
    const refreshUser = getUserInfosReq.refetch;
    return (
        <div className='profil'>
            {
                authInfos && <div className="profil-infos_posts">
                    <ProfilInfos props={{ authInfos, profilInfos: getUserInfos, refreshUser }} />
                    {
                        profilId ? <ProfilPosts props={{ profilId }} />
                            : <ProfilPosts props={{ profilId: authedId, showOtherAction: true }} />

                    }

                </div>
            }
        </div>
    )
}

export default Profil
