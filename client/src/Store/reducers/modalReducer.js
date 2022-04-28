
export const modalReducer = (state = { open: false, content: "" }, action) => {
    switch (action.type) {
        case 'SET_MODAL':
            return { ...state, open: action.payload };

        case 'SET_MODAL_CONTENT':
            return { ...state, content: action.payload };

        default:
            return state;
    }
}