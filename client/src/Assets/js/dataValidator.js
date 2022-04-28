export const confirmPassword = (password, confirmation) => {
    if (password === confirmation)
        return true
    return false
}