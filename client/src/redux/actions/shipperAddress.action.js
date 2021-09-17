import * as api from '../api';

export const getShipperAddress = (id) => async (dispatch) => {
    try {
        const { data } = await api.getShipperAddress(id);
        dispatch({ type: 'FETCH_SHIPPER_ADDRESS', payload: data })
        console.log("data", data)
    } catch (error) {
        console.log(error);
    }
}

export const updateShipperAddress = (id, shipperAddress) => async (dispatch) => {
    try {
        const { data } = await api.updateShipperAddress(id, shipperAddress);
        dispatch({ type: 'UPDATE_SHIPPER_ADDRESS', payload: data })
    } catch (error) {
        console.log(error);
    }
}
