import { udcActionTypes } from './udcActionTypes'

const INITIAL_STATE = {

    udcData: [],
    menuData:[]
    

}
const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case udcActionTypes.SET_UDC_DATA:
            return {
                ...state,
                udcData: action.payload
            };
        case udcActionTypes.SET_MENU_DATA:
            return {
                ...state,
                menuData: action.payload
            };
        default:
            return state
    }
}
export default bookingReducer;