export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BOXES':
            return {
                ...state,
                boxes: action.payload
            }
        default:
            return state;
    }
}
