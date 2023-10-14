import { getIngredients, postOrderDetailsNumber } from "../../utils/api/api"

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'

export const OPTIONS_OF_INGREDIENT = 'OPTIONS_OF_INGREDIENT'
export const DELETE_OPTIONS_OF_INGREDIENT = 'DELETE_OPTIONS_OF_INGREDIENT'

export const OPEN_POPUP_ORDER_DETAILS = 'POPUP_ORDER_DETAILS'
export const CLOSE_POPUP_ORDER_DETAILS = 'CLOSE_POPUP_ORDER_DETAILS'

export const OPEN_POPUP_INGREDIENT = 'OPEN_POPUP_INGREDIENT'
export const CLOSE_POPUP_INGREDIENT = 'CLOSE_POPUP_INGREDIENT'

export const ADD_INGREDIENT_BURGER = 'ADD_INGREDIENT_BURGER'
export const ADD_BUN_BURGER = 'ADD_BUN_BURGER'


export const DELETE_INGREDIENT_BURGER = 'DELETE_INGREDIENT_BURGER';
export const MOVE_INGREDIENT_BURGER = 'MOVE_INGREDIENT_BURGER'
export const CLEAR_BUN_CONSTRUCTOR = 'CLEAR_BUN_CONSTRUCTOR'
export const CLEAR_INGREDIENT_CONSTRUCTOR = 'CLEAR_INGREDIENT_CONSTRUCTOR'

export function getIngredientsItems() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredients()
        .then(res => {
            if(res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: res.data
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}

export function postOrderNumber(array) {
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })
        postOrderDetailsNumber(array)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    number: res
                })
            } else {
                dispatch({
                    type: POST_ORDER_FAILED
                })
            }
        })
        .catch(err => {
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    }
}