export function handleFieldChange(event, setFieldValue) {
    const value = event.target.value;
    const name = event.target.name;
    setFieldValue(value)
}

export function handleFormValuesChange(event, formValues, setFormValues) {
    const value = event.target.value;
    const name = event.target.name;
    setFormValues({ ...formValues, [name]: value })

}

export const getError = (fieldName, errors) => {
    const error = errors.filter(item => item.name == fieldName);
    if (error.length > 0) {
        return <span className="fieldError" >{error[0].message}</span>
    }
}