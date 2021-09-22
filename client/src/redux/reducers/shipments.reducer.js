export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SHIPMENT':
            return {
                ...state,
                // shipments: action.payload.Data.purchaseOrders.filter((po) => po.TotalBoxesCompleted !== 0)
                shipments: action.payload
            }
        default:
            return state;
    }
}

