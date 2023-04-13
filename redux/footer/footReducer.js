import { footActionTypes } from './footActionTypes'

const INITIAL_STATE = {

    FootData: [],
    
    

}
const footReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case footActionTypes.SET_FOOT_DATA:
            return {
                ...state,
                FootData: action.payload
            };
       
        default:
            return state
    }
}
export default footReducer;