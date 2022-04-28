
export const dispatchBtn = (type, content) => {
    const btns = {
        simple: <button className=''>{content}</button>,
        onLoad: <button className=''>{content}
            <i className='mdi mdi-spin mdi-loading'></i></button>,
        disable: <button className=' disabled' disabled >{content}</button>,
        disableAndLoad: <button className=' disabled' disabled >{content}
            <i className='mdi mdi-spin mdi-loading'></i>
        </button>

    }

    return btns[type]
}




export const getSuccess = (fieldName, success) => {
    const successList = success.filter(item => item.name == fieldName);
    if (successList.length > 0) {
        return successList.map(scs => <b className="fieldSuccess"
            key={scs.type}>{scs.success}</b>)
    }
}

// else if (validationType == 'isMail') {
//     regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(char);
//     errorMsg = 'Format du mail incorrect';
// }
// else if (validationType == 'isPassword') {
//     regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(char);
//     errorMsg = 'Le Mot de passe doit contenir au moins ' +
//         '1 majuscule,1 miniscule,1 caractère special,1 chiffre';
// }