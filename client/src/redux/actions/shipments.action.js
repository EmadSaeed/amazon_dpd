import * as api from '../api';

// Action Creators
export const getShipments = (dateCreated) => async (dispatch) => {
    try {
        const { data } = await api.fatchShipments(dateCreated);
        console.log("data: ", data)
        dispatch({ type: 'FETCH_SHIPMENT', payload: data })
    } catch (error) {
        console.log(error);
    }
}
