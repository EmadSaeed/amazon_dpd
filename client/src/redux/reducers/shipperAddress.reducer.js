export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SHIPPER_ADDRESS':
            return {
                ...state,
                shipperAddress: action.payload
            }
        case 'UPDATE_SHIPPER_ADDRESS':
        return state;
        default:
            return state;
    }
}
