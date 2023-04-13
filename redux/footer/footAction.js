import { footActionTypes } from './footActionTypes'
import Axios from 'axios';
import {API_PATH } from '../../Global';

export const setFootData = data => ({
    type: footActionTypes.SET_FOOT_DATA,
    payload: data

})
export const fetchFootData = () => {
    return dispatch => {
        Axios.get(API_PATH + 'fetch-footer-data.php')
            .then(({ data }) => {
                dispatch(setFootData(data))
                
            })

    }
}