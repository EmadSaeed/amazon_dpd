import * as api from '../api';

// Action Creators
export const getBoxes = (dateCreated) => async (dispatch) => {
    try {
        const { data } = await api.fatchBoxes(dateCreated);
        console.log("Box data: ", data)
        dispatch({ type: 'FETCH_BOXES', payload: data })
    } catch (error) {
        console.log(error);
    }
}
