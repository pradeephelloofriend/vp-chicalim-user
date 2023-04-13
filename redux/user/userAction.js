import { userActionTypes } from './userActionTypes' // get dynamic user acton types
import Axios from 'axios';
export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})

export const setUserActive = data => ({
    type: userActionTypes.SET_USER_ACTIVE,
    payload: data
})



export const setUserPhone = data => ({
    type: userActionTypes.SET_USER_PHONE,
    payload: data
})

export const setUserProfileData = data => ({
    type: userActionTypes.SET_USER_PROFILE_DATA,
    payload: data
})
/*export const fetchUserProfileData = (uId) => {
    return dispatch => {
        //console.log('tripId', tripId)

        Axios.post(`/api/user/${uId}`,)
            .then(({ data }) => {
                //console.log('data-middlware',data)
                //updateProduct(data)
                dispatch(setUserProfileData(data))
                
            })
    }
}*/