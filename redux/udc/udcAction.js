import { udcActionTypes } from './udcActionTypes'
import Axios from 'axios';
import {API_PATH } from '../../Global';
//---------set udc data-----------------
export const setUdcData = data => ({
    type: udcActionTypes.SET_UDC_DATA,
    payload: data

})
export const fetchUdcData = () => {
    return dispatch => {
        Axios.get(API_PATH + 'fetch-udc-data.php')
            .then(({ data }) => {
                dispatch(setUdcData(data))
                
            })

    }
}
export const setMenuData = data => ({
    type: udcActionTypes.SET_MENU_DATA,
    payload: data

})
export const fetchMenuData = () => {
    return dispatch => {
        Axios.get(API_PATH + 'fetch-menu-item.php')
            .then(({ data }) => {
                dispatch(setMenuData(data))

            })

    }
}
