export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_DELIVERY_NOTE':
            return {
                ...state,
                deliveryNote: action.payload
            }
        case 'UPDATE_DELIVERY_NOTE':
        return state;
        default:
            return state;
    }
}
