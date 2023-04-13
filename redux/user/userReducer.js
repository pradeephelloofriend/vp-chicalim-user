
import { userActionTypes } from './userActionTypes'
const INITIAL_STATE = {
    cUser:null,
    gUser:null,
    userPhone:'',
    loginStep:null,
    userOrder:[],
    isRegistration:false,
    tripData:null,
    userProfileData:[],
    userActive:false
}
const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                cUser: action.payload
            }




        case userActionTypes.SET_USER_PHONE:
            //console.log('user cation',state.gUser)
            return {
                ...state,
                userPhone: action.payload
            }
        case userActionTypes.SET_USER_PROFILE_DATA:
            //console.log('user cation',state.gUser)
            return {
                ...state,
                userProfileData: action.payload,
                userActive: false
            }
        case userActionTypes.SET_USER_ACTIVE:
            //console.log('user cation',state.gUser)
            return {
                ...state,
                userActive: action.payload
            }
        default:
            return state
    }
}
export default UserReducer;