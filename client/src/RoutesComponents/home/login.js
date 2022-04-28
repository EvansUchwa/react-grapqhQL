import React from 'react'
import { InputText, InputPassword } from '../../Components/form'

function Login({ props }) {
    const { formValues, setFormValues,
        errors, setErrors } = props
    return (
        <>
            <div className='formSegment'>
                <label>Pseudo</label>
                <InputText props={{
                    name: "username",
                    ph: "Ton pseudo",
                    formValues, setFormValues,
                    normalizer: "onlyLetterAndNumber"
                }} />
            </div>

            <div className='formSegment'>
                <label>Mot de passe</label>
                <InputPassword props={{
                    name: "password",
                    ph: "Ton mot de passe",
                    formValues, setFormValues,
                    normalizer: "onlyLetterAndNumberWithSpace",
                    errors, setErrors
                }} />
            </div>
        </>
    )
}

export default Login
