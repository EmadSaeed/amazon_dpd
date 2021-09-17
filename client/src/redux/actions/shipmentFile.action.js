import * as api from '../api';

// Action Creators
export const writeShipmentFile = (fileName) => async (dispatch) => {
    try {
        const { data } = await api.writeShipmentFile(fileName);
        // console.log("productData: ", data)
        dispatch({ type: 'WRITE_SHIPMENT_FILE', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const downloadShipmentFile = (fileName) => async (dispatch) => {
    try {
        const { data } = await api.downloadShipmentFile(fileName);
        // console.log("productData: ", data)
        dispatch({ type: 'DOWNLOAD_SHIPMENT_FILE', payload: data })
    } catch (error) {
        console.log(error);
    }
}
