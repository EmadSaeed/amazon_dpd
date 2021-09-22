export default (state = [], action) => {
    switch (action.type) {
        case 'CREATE_SELECTED_SHIPMENT':
            return {
                ...state,
                selectedShipment: action.payload
            }
        case 'GET_SELECTED_SHIPMENT':
            return {
                ...state,
                selectedShipment: action.payload
            }
        case 'UPDATE_SELECTED_SHIPMENT':
            return {
                ...state,
                selectedShipment: action.payload
            }
        case 'TRUNCATE_SELECTED_SHIPMENT':
            return state;
        default:
            return state;
    }
}
