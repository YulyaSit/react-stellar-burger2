import {NULL_BUN_CONSTRUCTOR, NULL_INGREDIENTS_CONSTRUCTOR, OPEN_POPUP_ORDER_DETAILS, CLOSE_POPUP_ORDER_DETAILS, ADD_BUN_BURGER, ADD_INGREDIENT_BURGER, DELETE_INGREDIENT_BURGER, MOVE_INGREDIENT_BURGER } from "../actions/actions"
import update from 'immutability-helper'
const InitialState = {
    popupIsActive: false,
    bun: null,
    ingredients: []
}

export const burgerIngredientsConstructorReducer = (state = InitialState, action) => {
    switch(action.type) {
        case OPEN_POPUP_ORDER_DETAILS: {
            return {
                ...state,
                popupIsActive: true
            }
        }
        case CLOSE_POPUP_ORDER_DETAILS: {
            return {
                ...state,
                popupIsActive: false
            }
        }
        case ADD_INGREDIENT_BURGER: {
            return {
                ...state,
                ingredients: [...state.ingredients, {...action.ingredients, key: action.key} ]
            }
        }
        case ADD_BUN_BURGER: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case DELETE_INGREDIENT_BURGER: {
            return {
              ...state,
              ingredients: [...state.ingredients].filter(item => item.key !== action.key)
            }
          }
          case MOVE_INGREDIENT_BURGER: {
            const ingredientsUpdate = update([...state.ingredients], {
              $splice: [
                [[action.dragIndex], 1],
                [[action.hoverIndex], 0, [...state.ingredients][action.dragIndex]]
              ]
            })
            return {
              ...state,
              ingredients: ingredientsUpdate
            }
          }
        default: {
            return state
        }
    }
}

export function addBunBurger(item) {
    return {
      type: ADD_BUN_BURGER,
      bun: item,
    }
  }
  
  export function addIngredientBurger(item, keyUuid) {
    return {
      type: ADD_INGREDIENT_BURGER,
      ingredients: item,
      key: keyUuid
    }
  }
  

  export function moveIngredient(dragIndex, hoverIndex) {
    return {
      type: MOVE_INGREDIENT_BURGER,
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
    }
  }