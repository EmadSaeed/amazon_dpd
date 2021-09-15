import * as api from '../api';

// Action Creators
export const getAddresses = (page, type) => async (dispatch) => {
    try {
        const { data } = await api.fatchAddress(page,type);
        // console.log("data: ", data)
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const createAddress = (address) => async (dispatch) => {
    try {
        const { data } = await api.createAddress(address);
        dispatch({ type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = (id, address) => async (dispatch) => {
    try {
        const { data } = await api.updateAddress(id, address);
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = (id) => async (dispatch) => {
    try {
        await api.deleteAddress(id);

        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log(error);
    }
}


export const setAllSelectedToFalse = (type) => async (dispatch) => {
    try {
        await api.setAllSelectedToFalse(type);

        dispatch({ type: 'SET_ALL_SELECTED_TO_FALSE' })
    } catch (error) {
        console.log(error);
    }
}

export const getFulfilmentSelectedAddress = () => async (dispatch) => {
    try {
        const { data } = await api.fatchFulfilmentSelectedAddress();
        console.log("data: ", data)
        dispatch({ type: 'FETCH_FULFILMENT_SELECTED_ADDRESS', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getInvoiceSelectedAddress = () => async (dispatch) => {
    try {
        const { data } = await api.fatchInvoiceSelectedAddress();
        console.log("data: ", data)
        dispatch({ type: 'FETCH_INVOICE_SELECTED_ADDRESS', payload: data })
    } catch (error) {
        console.log(error);
    }
}
