import * as api from '../api';

// Action Creators
export const getProducts = (EAN) => async (dispatch) => {
    try {
        const { data } = await api.fatchProductsByEAN(EAN);
        // console.log("productData: ", data)
        dispatch({ type: 'FETCH_PRODUCTS', payload: data })
    } catch (error) {
        console.log(error);
    }
}
