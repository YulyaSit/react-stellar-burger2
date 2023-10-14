import { OPTIONS_OF_INGREDIENT, DELETE_OPTIONS_OF_INGREDIENT } from "../actions/actions"

const InitialState = {
    options: null
}

export const ingredientDetailsReducer = (state = InitialState, action) => {
    switch(action.type) {
        case OPTIONS_OF_INGREDIENT: {
            return {
                ...state,
                options: action.options
            }
        }
        case DELETE_OPTIONS_OF_INGREDIENT: {
            return {
                ...state,
                options: null
            }
        }
        default: {
            return state
        }
    }
}

export function openInfoIngredient(ingredient) {
    return {
      type: OPTIONS_OF_INGREDIENT, options: ingredient
    }
  }