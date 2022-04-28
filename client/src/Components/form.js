import React from 'react'
import { onlyLetterAndNumber, onlyLetterAndNumberWithSpace } from '../Assets/js/dataNormalizer';
import { confirmPassword } from '../Assets/js/dataValidator';
import { handleFieldChange, handleFormValuesChange } from '../Assets/js/form';

function setFormError(fieldName, typeError, errors, setErrors, validation) {
    if (typeError == "passwordConfirmation") {
        const copyErrs = [...errors]
        const errorExist = errors.findIndex(err => err.name == fieldName)
        if (!validation) {
            if (errorExist == -1) {
                copyErrs.push({ name: fieldName, message: "Les mots de passe ne correspondent pas" })
                return setErrors(copyErrs)
            }
        }
        else {
            copyErrs.splice(errorExist, 1)
            return setErrors(copyErrs)
        }
    }
}

const functionsObj = {
    "onlyLetterAndNumberWithSpace": onlyLetterAndNumberWithSpace,
    "onlyLetterAndNumber": onlyLetterAndNumber
}
export function InputText({ props }) {
    const { name, ph,
        fieldValue, setFieldValue,
        formValues, setFormValues, normalizer } = props
    return <section>
        <input type={"text"} name={name}
            value={formValues ? formValues[name] : fieldValue}
            placeholder={ph}
            onChange={(event) => {
                if (functionsObj[normalizer](event.target.value)) {
                    formValues ?
                        handleFormValuesChange(event, formValues, setFormValues)
                        : handleFieldChange(event, setFieldValue)
                }
            }} />
    </section>
}

export function InputMail({ props }) {
    const { name, ph,
        fieldValue, setFieldValue,
        formValues, setFormValues } = props
    return <section>
        <input type="mail" name={name}
            value={formValues ? formValues[name] : fieldValue}
            placeholder={ph}
            onChange={(event) => {
                formValues ?
                    handleFormValuesChange(event, formValues, setFormValues)
                    : handleFieldChange(event, setFieldValue)

            }} />
    </section>
}

export function InputPassword({ props }) {
    const { name, ph,
        fieldValue, setFieldValue,
        formValues, setFormValues,
        normalizer,
        errors, setErrors, isConfirmation } = props

    function handlePwdView(event) {
        // console.log(event.currentTarget.children[0])
        if (event.target.previousSibling.getAttribute('type') == 'password') {
            event.target.setAttribute('class', "password-icon-visible mdi mdi-eye")
            event.target.previousSibling.setAttribute('type', 'text')
        } else {
            event.target.previousSibling.setAttribute('type', 'password')
            event.target.setAttribute('class', 'password-icon mdi mdi-eye-off-outline')
        }
    }
    return <section>
        <input type={"password"} name={name}
            value={formValues ? formValues[name] : fieldValue}
            placeholder={ph}
            onChange={(event) => {
                if (functionsObj[normalizer](event.target.value)) {
                    formValues ?
                        handleFormValuesChange(event, formValues, setFormValues)
                        : handleFieldChange(event, setFieldValue)
                    if (isConfirmation) {
                        const validation = confirmPassword(isConfirmation, event.target.value)
                        setFormError(name, 'passwordConfirmation',
                            errors, setErrors, validation)
                        // console.log(validation + "_" + isConfirmation + "_" + event.target.value)

                    }
                }
            }} />
        <span className="password-icon mdi mdi-eye-off-outline"
            onClick={(event) => handlePwdView(event)}>
        </span>
    </section>
}

export function Select({ props }) {
    const { name, ph,
        fieldValue, setFieldValue,
        formValues, setFormValues, options } = props
    return <section>
        <select name={name}
            defaultValue={formValues ? formValues[name] : fieldValue}
            onChange={(event) => {
                formValues ?
                    handleFormValuesChange(event, formValues, setFormValues)
                    : handleFieldChange(event, setFieldValue)
            }}>
            {
                options.map((op, index) => <option value={op.value}
                    key={name + "-select op nb" + index}>
                    {op.label}
                </option>)
            }
        </select>
    </section>
}

export function TextArea({ props }) {
    const { name, ph,
        fieldValue, setFieldValue,
        formValues, setFormValues,
        normalizer } = props
    return <section>
        <textarea name={name}
            value={formValues ? formValues[name] : fieldValue}
            placeholder={ph}
            onChange={(event) => {
                if (functionsObj[normalizer](event.target.value)) {
                    formValues ?
                        handleFormValuesChange(event, formValues, setFormValues)
                        : handleFieldChange(event, setFieldValue)
                }
            }} ></textarea>
    </section>
}


export function Form({ props, children }) {
    const { submitFunction, classname } = props;

    function handleSumbit(event) {
        event.preventDefault();
        submitFunction();
    }
    return (
        <form onSubmit={(event) => handleSumbit(event)}
            className={classname ? classname : ""}>
            {
                children
            }
        </form>
    )
}

