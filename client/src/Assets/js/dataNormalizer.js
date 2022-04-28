export function onlyNumber(value) {
    const reg = new RegExp('^[0-9]+$')
    if (reg.test(value)) {
        return true
    }
    return false;
}

export function onlyLetter(value) {
    const reg = /^[a-zA-ZÀ-ú]*$/;
    if (reg.test(value))
        return true
    return false
}

export function onlyLetterWithSpace(value) {
    const reg = /^[a-zA-ZÀ-ú\s]*$/;
    if (reg.test(value))
        return true
    return false
}

export function onlyLetterAndNumber(value) {
    const reg = /^[a-zA-ZÀ-ú-0-9]*$/;
    if (reg.test(value))
        return true
    return false
}

export function onlyLetterAndNumberWithSpace(value) {
    const reg = /^[a-zA-ZÀ-ú-0-9\s]*$/;
    if (reg.test(value))
        return true
    return false
}