import { orgActionTypes } from './orgActionTypes'
import Axios from 'axios';
import {API_PATH } from '../../Global';

export const setOrgData = data => ({
    type: orgActionTypes.SET_ORG_DATA,
    payload: data

})
export const fetchOrgData = () => {
    return dispatch => {
        Axios.get(API_PATH + 'fetch-org-data.php')
            .then(({ data }) => {
                dispatch(setOrgData(data))
                
            })

    }
}
