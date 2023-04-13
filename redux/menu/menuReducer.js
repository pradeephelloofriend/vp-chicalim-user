import { menuActionTypes } from './menuActionTypes'

const INITIAL_STATE = {

    MenuData: [],
    missionData:[],
    regCertData:null,
    regStatus:false,
    userUploadStatus:false,
    tabKey:null,
    toggleActive:false,
    menuId:1,
    subMenuId:1.1

    

}
const menuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case menuActionTypes.SET_MENU_DATA:
            return {
                ...state,
                MenuData: action.payload
            };
            case menuActionTypes.SET_TOGGLE_ACTIVE:
                return {
                    ...state,
                    toggleActive: !state.toggleActive
                };
            case menuActionTypes.SET_MISSION_DATA:
                return {
                    ...state,
                    missionData: action.payload
                };
                case menuActionTypes.SET_REG_STATUS:
                    return {
                        ...state,
                        regStatus: action.payload
                    };
                    case menuActionTypes.SET_USER_UPLOAD_STATUS:
                    return {
                        ...state,
                        userUploadStatus: action.payload
                    }; 
                    case menuActionTypes.SET_REG_CERT_DATA:
                    return {
                        ...state,
                        regCertData: action.payload
                    };  
                    case menuActionTypes.SET_TAB_KEY:
                        return {
                            ...state,
                            tabKey: action.payload
                        }; 
                        case menuActionTypes.SET_MENU_ID:
                        return {
                            ...state,
                            menuId: action.payload
                        };
                        case menuActionTypes.SET_SUB_MENU_ID:
                        return {
                            ...state,
                            subMenuId: action.payload
                        }; 
       
        default:
            return state
    }
}
export default menuReducer;