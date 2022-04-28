
export const setModalOnStore = (modalState) => {
    return {
        type: 'SET_MODAL',
        payload: modalState
    }
}

export const setModalContentOnStore = (modalContent) => {
    return {
        type: 'SET_MODAL_CONTENT',
        payload: modalContent
    }
}