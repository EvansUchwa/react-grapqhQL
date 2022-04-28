import React, { useState } from 'react'
import { InputText, TextArea } from '../../Components/form'
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelector from '../../Store/selectors/authSelector';
import { ADD_MOVIE } from '../../Gqls/movie';
import { MovieFormField } from './movieUI';


function AddMovie() {
    const auth = useSelector(authSelector)
    const [formValues, setFormValues] = useState({ name: "", description: "", type: "" })
    const [addStatus, setAddStatus] = useState(null);
    const [movieAdded, setMovieAdded] = useState(null);
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const addTheNewMovie = await addMovie({
                variables: {
                    "name": formValues.name,
                    "description": formValues.description,
                    "userId": auth.loggedInfos._id,
                    "type": formValues.type
                }
            })
            setAddStatus("Film ajouté avec succeès")
            setMovieAdded(addTheNewMovie.data.addMovie)
        } catch (error) {
            setAddStatus("Une erreur s'est produite pendant l'ajout")
        }
    }
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE)
    return (
        <div className='movie-add'>
            <h1>Ajouter un film</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <MovieFormField props={{ formValues, setFormValues }} />
                <div className='formBtn'>
                    <button>Ajouter le film</button>
                </div>
                <div className='addStatusAndLink'>
                    <b className=''>
                        {addStatus}
                    </b>
                    {
                        movieAdded && <Link to={"/Movie/detail/" + movieAdded._id}>Voir le film ici</Link>
                    }
                </div>

            </form>

        </div>
    )
}

export default AddMovie
