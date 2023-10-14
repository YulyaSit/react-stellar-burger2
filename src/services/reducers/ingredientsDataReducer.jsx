import { getIngredientsItems } from "../actions/actions";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, OPEN_POPUP_INGREDIENT, CLOSE_POPUP_INGREDIENT, DELETE_INFO_INGREDIENT } from "../actions/actions";

const InitialState = ({
    ingredientsBurger: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    openIngredientPopup: false
})

export const IngredientsDataReducer = (state = InitialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsBurger: action.items,
                ingredientsRequest: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        case OPEN_POPUP_INGREDIENT: {
            return {
                ...state,
                openIngredientPopup: true
            }
        }
        case CLOSE_POPUP_INGREDIENT: {
            return {
                ...state,
                openIngredientPopup: false
            }
        }
        default: {
            return state
        }
    }
}
