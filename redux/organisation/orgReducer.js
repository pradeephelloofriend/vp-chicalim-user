import { orgActionTypes } from './orgActionTypes'

const INITIAL_STATE = {

    orgData: [],
    
    

}
const orgReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case orgActionTypes.SET_ORG_DATA:
            return {
                ...state,
                orgData: action.payload
            };
       
        default:
            return state
    }
}
export default orgReducer;