import { 
    SET_GLOBAL_ALERT, 
    RESET_GLOBAL_ALERT
} from "../actions/actionTypes/globalAlertTypes"


export const globalAlertReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_GLOBAL_ALERT: 
            return { alert: action.payload}
        case RESET_GLOBAL_ALERT:
            return {}
        default:
            return state
    }
}