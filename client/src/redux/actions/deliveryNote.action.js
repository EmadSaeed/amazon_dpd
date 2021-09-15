import * as api from '../api';

export const getDeliveryNote = (id) => async (dispatch) => {
    try {
        const { data } = await api.getDeliveryNote(id);
        dispatch({ type: 'FETCH_DELIVERY_NOTE', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateDeliveryNote = (id, deliveryNote) => async (dispatch) => {
    try {
        const { data } = await api.updateDeliveryNote(id, deliveryNote);
        dispatch({ type: 'UPDATE_DELIVERY_NOTE', payload: data })
    } catch (error) {
        console.log(error);
    }
}
