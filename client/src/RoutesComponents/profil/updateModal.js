import React from 'react'
import { Form } from '../../Components/form'
import { MovieFormField } from '../movies/movieUI'
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_MOVIE } from '../../Gqls/movie';
import { useDispatch } from 'react-redux';
import { setModalOnStore } from '../../Store/actions/modalActions';
import { UPDATE_USER } from '../../Gqls/user';
import { UserFormFields } from '../home/userUI';

export function UpdateMovieModal({ props }) {
    const { movie, refreshUserMovies } = props;
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: movie.name,
        description: movie.description, type: movie.type
    })
    const [updateMovieReq] = useMutation(UPDATE_MOVIE);
    function handleSubmit() {
        updateMovieReq({
            variables: {
                movieId: movie._id,
                name: formValues.name, description: formValues.description
            }
        })
        dispatch(setModalOnStore(false))
        refreshUserMovies()
    }
    return (
        <Form props={{ submitFunction: handleSubmit }} >
            <MovieFormField props={{ formValues, setFormValues }} />
            <div className='formBtn'>
                <button>Enregistrer</button>
            </div>
        </Form>
    )
}


export function UpdateProfilModal({ props }) {
    const { user, refreshUser } = props;
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({ username: user.username, email: user.email })
    const [errors, setErrors] = useState([])
    const [updateMovieReq] = useMutation(UPDATE_USER);
    async function handleSubmit() {
        await updateMovieReq({
            variables: {
                userId: user._id,
                username: formValues.username,
                email: formValues.email
            }
        })

        // console.log(user._id)
        dispatch(setModalOnStore(false))
        refreshUser()
    }
    return (
        <Form props={{ submitFunction: handleSubmit }} >

            <UserFormFields props={{ formValues, setFormValues, errors, setErrors }} />
            <div className='formBtn'>
                <button>Enregistrer</button>
            </div>
        </Form>
    )
}