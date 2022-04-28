import React from 'react'
import { InputText, InputPassword } from '../../Components/form'
import { getError } from '../../Assets/js/form'
import { UserFormFields } from './userUI'
// formValues, setFormValues, errors, setErrors
function SignUp({ props }) {
    const { formValues, setFormValues,
        errors, setErrors } = props
    return (
        <>
            <UserFormFields props={{ formValues, setFormValues, errors, setErrors }} />

            <div className='formSegment'>
                <label>Confirmer Mot de passe</label>
                <InputPassword props={{
                    name: "confirmPassword",
                    ph: "Confirme ton mot de passe...",
                    formValues, setFormValues,
                    normalizer: "onlyLetterAndNumberWithSpace",
                    isConfirmation: formValues.password,
                    errors, setErrors
                }} />
                {getError("confirmPassword", errors)}
            </div>
        </>
    )
}

export default SignUp
