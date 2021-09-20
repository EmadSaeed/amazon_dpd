export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                addresses: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case 'CREATE':
            return [...state, action.payload];
        case 'UPDATE':
        return state;
        case 'DELETE':
            return state.filter((address) => address.id !== action.payload);
        case 'SET_ALL_SELECTED_TO_FALSE':
            return state;
        case 'FETCH_FULFILMENT_SELECTED_ADDRESS':
            return {...state,
                fulfilmentSelectedAddress: action.payload
            }
        case 'FETCH_INVOICE_SELECTED_ADDRESS':
            return {...state,
                invoiceSelectedAddress: action.payload
            }
        default:
            return state;
    }
}

