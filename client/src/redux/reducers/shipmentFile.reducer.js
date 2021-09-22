export default (state = [], action) => {
    switch (action.type) {
        case 'WRITE_SHIPMENT_FILE':
            return {
                ...state,
                products: action.payload
            }
        case 'DOWNLOAD_SHIPMENT_FILE':
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
}
