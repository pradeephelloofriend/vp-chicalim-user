import { brchActionTypes } from './brchActionTypes'

const INITIAL_STATE = {

    BrchData: [],
    
    

}
const brchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case brchActionTypes.SET_BRCH_DATA:
            return {
                ...state,
                BrchData: action.payload
            };
       
        default:
            return state
    }
}
export default brchReducer;