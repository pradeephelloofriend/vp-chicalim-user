import { brchActionTypes } from './brchActionTypes'
import Axios from 'axios';
import {API_PATH } from '../../Global';

export const setBrchData = data => ({
    type: brchActionTypes.SET_BRCH_DATA,
    payload: data

})
export const fetchBrchData = () => {
    return dispatch => {
        Axios.get(API_PATH + 'fetch-brch-data.php')
            .then(({ data }) => {
                dispatch(setBrchData(data))
                
            })

    }
}
