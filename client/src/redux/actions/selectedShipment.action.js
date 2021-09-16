import * as api from '../api';

// Action Creators
export const createSelectedShipment = (selectedShipment) => async (dispatch) => {
    try {
        const { data } = await api.createSelectedShipment(selectedShipment);
        dispatch({ type: 'CREATE_SELECTED_SHIPMENT', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getSelectedShipment = () => async (dispatch) => {
    try {
        const { data } = await api.getSelectedShipment();
        dispatch({ type: 'GET_SELECTED_SHIPMENT', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateSelectedShipment = (EAN, selectedShipment) => async (dispatch) => {
    try {
        const { data } = await api.updateSelectedShipment(EAN, selectedShipment);
        dispatch({ type: 'UPDATE_SELECTED_SHIPMENT', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const truncateSelectedShipment = (selectedShipment) => async (dispatch) => {
    try {
        await api.truncateSelectedShipment(selectedShipment);
        dispatch({ type: 'TRUNCATE_SELECTED_SHIPMENT'});
    } catch (error) {
        console.log(error);
    }
}