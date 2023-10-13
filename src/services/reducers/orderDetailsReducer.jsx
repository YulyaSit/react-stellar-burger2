import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS } from "../actions/actions"

const InitialState = {
    numberSuccess: null,
    numberRequest: false,
    numberFailed: false
}

export const postOrderDetailsReducer = (state = InitialState, action) => {
    switch(action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                numberRequest: true
            }
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                numberRequest: false,
                numberFailed: false,
                numberSuccess: action.number
            }
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                numberRequest: false,
                numberFailed: true
            }
        }
        default: {
            return state
        }
    }
}