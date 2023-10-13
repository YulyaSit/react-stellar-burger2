import { combineReducers } from "redux";
import { IngredientsDataReducer } from "./ingredientsDataReducer";
import { postOrderDetailsReducer } from "./orderDetailsReducer";
import { ingredientDetailsReducer } from "./ingredientDetailsReducer";
import { burgerIngredientsConstructorReducer } from "./burgerConstructorReducer";

export const rootReducer = combineReducers({
    ingredients: IngredientsDataReducer,
    orderDetails: postOrderDetailsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerIngredientsConstructor: burgerIngredientsConstructorReducer
})