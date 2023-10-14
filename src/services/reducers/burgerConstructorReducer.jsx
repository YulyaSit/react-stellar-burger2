import {CLEAR_BUN_CONSTRUCTOR, CLEAR_INGREDIENT_CONSTRUCTOR, OPEN_POPUP_ORDER_DETAILS, CLOSE_POPUP_ORDER_DETAILS, ADD_BUN_BURGER, ADD_INGREDIENT_BURGER, DELETE_INGREDIENT_BURGER, MOVE_INGREDIENT_BURGER } from "../actions/actions"
import update from 'immutability-helper'
import {v4 as uuidv4 } from "uuid";
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
          case CLEAR_BUN_CONSTRUCTOR: {
            return {
              ...state,
              bun: null
            }
          }
          case CLEAR_INGREDIENT_CONSTRUCTOR: {
            return {
              ...state,
              ingredients: []
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
  
  export function addIngredientBurger(item) {
    return {
      type: ADD_INGREDIENT_BURGER,
      ingredients: {
        ...item,
        uniqueId: uuidv4()
      }
    }
  }
  

  export function moveIngredient(dragIndex, hoverIndex) {
    return {
      type: MOVE_INGREDIENT_BURGER,
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
    }
  }