import { serviceActionTypes } from './serviceActionTypes'
import Axios from 'axios';
import { API_PATH } from '../../Global';
//---------set udc data-----------------
export const setServiceData = data => ({
    type: serviceActionTypes.SET_SERVICES_DATA,
    payload: data

})
export const fetchAllServiceData = () => {
    return async dispatch => {
        const res = await fetch(`${process.env.API_PATH}/services`)
        const data = await res.json()
        dispatch(setServiceData(data))   
        

    }
}
export const setServiceAreaData = data => ({
    type: serviceActionTypes.SET_SERVICE_AREA_DATA,
    payload: data

})
export const setSchemeAreaData = data => ({
    type: serviceActionTypes.SET_SCHEME_AREA_DATA,
    payload: data

})
