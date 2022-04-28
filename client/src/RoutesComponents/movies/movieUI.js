import React from 'react'
import { Link } from 'react-router-dom';
import { InputText, Select, TextArea } from '../../Components/form';

export function MoviePreviewCard({ children, props }) {
    const { movie, showOtherAction } = props;
    const { _id, name, likeCount, dislikeCount } = movie;
    return (
        <article className="moviePreview">
            {name}
            <section>
                <p>
                    <span>
                        {likeCount} <i className='mdi mdi-thumb-up'></i>
                    </span>
                    <span>
                        {dislikeCount} <i className='mdi mdi-thumb-down'></i>
                    </span>
                </p>
                <Link to={"/Movie/detail/" + _id}>Voir plus</Link>
            </section>
            {
                children && children
            }
        </article>
    )
}

export const MovieFormField = ({ props }) => {
    const { formValues, setFormValues } = props

    const movieOptions = [
        { label: "Horreur", value: "Horreur" },
        { label: "Science-fiction", value: "Science-fiction" },
        { label: "Dramatique", value: "Dramatique" },
        { label: "Comédie", value: "Comédie" },

    ]
    return <>
        <div className='formSegment'>
            <label>
                Type de film
            </label>
            <Select props={{
                name: "type",
                ph: "Horreur,SF,Drame,etc....",
                value: formValues.name,
                formValues, setFormValues,
                options: movieOptions
            }} />
        </div>
        <div className='formSegment'>
            <label>
                Titre du film
            </label>
            <InputText props={{
                name: "name",
                ph: "Titre du film",
                value: formValues.name,
                normalizer: "onlyLetterAndNumberWithSpace",
                formValues, setFormValues
            }} />
        </div>
        <div className='formSegment'>
            <label>Description du film</label>
            <TextArea props={{
                name: "description",
                ph: "Decrivez ce film",
                value: formValues.name,
                normalizer: "onlyLetterAndNumberWithSpace",
                formValues, setFormValues
            }} />
        </div>
    </>
}
