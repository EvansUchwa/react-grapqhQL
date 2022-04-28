import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import { Form, TextArea } from '../../Components/form'
import { useSelector } from 'react-redux'
import authSelector from '../../Store/selectors/authSelector'
import { GET_MOVIE_COMMENTS, ADD_MOVIE_COMMENT } from '../../Gqls/comments'
import { GET_MOVIE_DETAIL } from '../../Gqls/movie'
import { ADD_MOVIE_LIKE, ADD_MOVIE_DISLIKE } from '../../Gqls/likeAndDislike'
import { SimpleSectionLoader } from '../../Components/loader'

function MovieDetail() {
    const { movieId } = useParams();
    const auth = useSelector(authSelector);
    const userId = auth && auth.loggedInfos && auth.loggedInfos._id
    // The movie
    const movie = useQuery(GET_MOVIE_DETAIL, { variables: { movieId, userId } })
    const movieLoading = movie.loading;
    const movieData = !movieLoading && movie.data.movieAndReaction;
    const movieRefresh = movie.refetch;
    // Movie Comments Request And Error
    const comments = useQuery(GET_MOVIE_COMMENTS, { variables: { movieId } })
    const commentsData = comments.data;
    const commentsLoad = comments.loading;
    const refreshComments = comments.refetch;

    // Movie Like By User Connected Request,error,
    function getMovieAutorProfilLink(movie) {
        return movie.autor._id === auth.loggedInfos._id
            ? '' : '/' + movie.autor._id
    }
    function getMovieAutorName(movie) {
        return movie.autor.username === auth.loggedInfos.username
            ? 'Vous'
            : movie.autor.username
    }
    return (
        <>
            {
                !movieLoading && auth && auth.loggedInfos ?
                    <div className='movie-detail'>
                        {
                            movieData ? <>
                                <h1>{movieData.name}</h1>
                                <h3>Publié par {' '}
                                    <Link to={"/Profil" + getMovieAutorProfilLink(movieData)}>
                                        {getMovieAutorName(movieData)}
                                    </Link>
                                </h3>
                                <section className='mD-category'>
                                    <b>Categorie : </b>
                                    <span>
                                        {movieData.type}
                                    </span>
                                </section>
                                <section className='mD-description'>
                                    <h2>Description :</h2>
                                    <p>
                                        {movieData.description}
                                    </p>
                                </section>
                                <MovieLikeAndDislike props={{ movieData, movieId, auth, movieRefresh }} />
                                <MovieComments props={{ movieId, commentsLoad, commentsData }} />
                                <AddMovieComment props={{ refreshComments, movieId, auth }} />
                            </> : <p>Désolé Ce film n'existe pas/plus .</p>
                        }

                    </div> : <SimpleSectionLoader />
            }
        </>
    )
}

const MovieLikeAndDislike = ({ props }) => {
    const { auth, movieData, movieId, movieRefresh } = props
    const userId = auth.loggedInfos._id
    const [addLike] = useMutation(ADD_MOVIE_LIKE)
    const [addDisLike] = useMutation(ADD_MOVIE_DISLIKE)
    async function toggleLike() {
        const toggleLikeReq = await addLike({ variables: { userId, movieId } })
        movieRefresh()

    }

    async function toggleDislike() {
        const toggleDislikeReq = await addDisLike({ variables: { userId, movieId } })
        movieRefresh()
    }
    return <section className='m-d-actions'>
        <p>
            {movieData.likeCount}
            <i className={"mdi mdi-thumb-up " +
                (movieData.like && " userLiked")}
                onClick={() => toggleLike()}>
            </i>
        </p>
        <p>
            {movieData.dislikeCount}
            <i className={"mdi mdi-thumb-down " +
                (movieData.dislike && " userDisliked")}
                onClick={() => toggleDislike()}>

            </i>
        </p>
    </section>
}
const MovieComments = ({ props }) => {
    const { movieId, commentsLoad, commentsData } = props;
    return <section className='m-d-comments'>
        {
            !commentsLoad ?
                commentsData.comments.length > 0 ?
                    commentsData.comments.map((com, index) => <article
                        key={"movie com nb" + index}>
                        <b>{com.user.username}</b>
                        <p>
                            {com.text}
                        </p>
                    </article>)
                    : <p>Aucun commentaire pour ce film</p>
                : 'Comment Charge'
        }
    </section>
}
const AddMovieComment = ({ props }) => {

    const { refreshComments, movieId, auth } = props;
    const [addMovie, { loading, error, data }] = useMutation(ADD_MOVIE_COMMENT);
    const [comment, setComment] = useState("");
    async function addMovieQuery() {
        const addTheMovieComment = await addMovie({
            variables: {
                movieId,
                userId: auth.loggedInfos._id,
                text: comment
            }
        })
        setComment('')
        refreshComments()

    }
    return <Form props={{ submitFunction: addMovieQuery, classname: "mD-form" }}>
        <div className='formSegment'>
            <label>Votre commentaire</label>
            <TextArea props={{
                name: "comment", ph: "Mon commentaire",
                fieldValue: comment, setFieldValue: setComment,
                normalizer: "onlyLetterAndNumberWithSpace"
            }} />
        </div>
        <div className='formBtn'>
            <button>Ajouter mon commentaire</button>
        </div>
    </Form>
}

export default MovieDetail
