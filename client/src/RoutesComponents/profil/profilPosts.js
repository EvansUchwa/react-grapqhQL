import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SimpleSectionLoader } from '../../Components/loader'
import { ConfirmationMessage } from '../../Components/Modal'
import { DELETE_MOVIE, GET_MOVIE_POSTED_BY_USER } from '../../Gqls/movie'
import { setModalContentOnStore, setModalOnStore } from '../../Store/actions/modalActions'
import { MoviePreviewCard } from '../movies/movieUI'
import { UpdateMovieModal } from './updateModal'
function ProfilPosts({ props }) {
    const { profilId } = props
    const dispatch = useDispatch();

    // Movies posted by user
    const moviesByUserReq = useQuery(GET_MOVIE_POSTED_BY_USER, { variables: { userId: profilId } })
    const moviesByUserLoading = moviesByUserReq.loading
    const moviesByUser = !moviesByUserLoading && moviesByUserReq.data.moviesByUser;
    const refreshUserMovies = moviesByUserReq.refetch;


    // Delete Movie
    const [updateMovieReq] = useMutation(DELETE_MOVIE)
    async function deleteMovie(movieId) {
        await updateMovieReq({ variables: { movieId } })
        refreshUserMovies()
        dispatch(setModalOnStore(false))
    }
    function confirmMovieDelete(movieId) {
        dispatch(setModalContentOnStore(<ConfirmationMessage props={{
            text: 'Veux tu vraiment supprimer ce film ?',
            functionAfterConfirm: deleteMovie,
            param: movieId
        }} />))
        dispatch(setModalOnStore(true))
    }

    function showUpMovieModal(movie) {
        dispatch(setModalContentOnStore(<UpdateMovieModal props={{ movie, refreshUserMovies }} />))
        dispatch(setModalOnStore(true))
    }
    // Update Movie

    return (
        <section className="pip-posts">
            <b>Dernière publications</b>
            <div>
                {
                    !moviesByUserLoading ? <>
                        {
                            moviesByUser.length > 0 ?
                                moviesByUser.map((post, index) => <MoviePreviewCard
                                    key={"profil mvp nb" + index}
                                    props={{ movie: post }} >
                                    {
                                        props.showOtherAction &&
                                        <div className='mp-actions'>
                                            <i className='mdi mdi-pen updateBtn'
                                                onClick={() => showUpMovieModal(post)}>
                                            </i>
                                            <i className='mdi mdi-delete deleteBtn'
                                                onClick={() => confirmMovieDelete(post._id)}>
                                            </i>
                                        </div>}
                                </MoviePreviewCard >
                                ) : <p>Aucun film posté</p>
                        }
                    </>
                        : <SimpleSectionLoader />
                }
            </div>
        </section>
    )
}

export default ProfilPosts
