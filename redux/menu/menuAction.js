import { menuActionTypes } from './menuActionTypes'
import Axios from 'axios';
import {API_PATH } from '../../Global';
import {getMenuItems} from '../../lib/api'
export const setMenuData = data => ({
    type: menuActionTypes.SET_MENU_DATA,
    payload: data

})
export const setToggleActive = data => ({
    type: menuActionTypes.SET_TOGGLE_ACTIVE
   

})
export const setMissionData = data => ({
    type: menuActionTypes.SET_MISSION_DATA,
    payload: data

})
export const setRegStatus = data => ({
    type: menuActionTypes.SET_REG_STATUS,
    payload: data

})
export const setUserUploadStatus = data => ({
    type: menuActionTypes.SET_USER_UPLOAD_STATUS,
    payload: data

})
export const setRegCertData = data => ({
    type: menuActionTypes.SET_REG_CERT_DATA,
    payload: data

})
export const setTabKey = data => ({
    type: menuActionTypes.SET_TAB_KEY,
    payload: data

})
export const setMenuId = data => ({
    type: menuActionTypes.SET_MENU_ID,
    payload: data

})
export const setSubMenuId = data => ({
    type: menuActionTypes.SET_SUB_MENU_ID,
    payload: data

})

        export const fetchMenuData = () => {
            return async dispatch => {
                const menuItems = await getMenuItems() //applo client 
                dispatch(setMenuData(menuItems))
                

            }
        }
        export const fetchMissionData = () => {
            return dispatch => {
                Axios.get(API_PATH + 'fetch-mission-data.php')
                    .then(({ data }) => {
                        dispatch(setMissionData(data))
                        
                    })
                    

            }
        }
