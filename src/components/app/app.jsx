import stylesApp from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import React from 'react'
import { getIngredients } from '../../utils/api/api.js'
import { IngredientsContext } from '../../services/ingredientsContext.jsx'


function App() {
  const [ingredientsBurger, setIngredientsBurger] = React.useState([])
  React.useEffect(() => {
    getIngredients()
      .then((result) => {
        (setIngredientsBurger(result.data))
      })
      .catch((err) => {
        console.log(err)
      });
    getIngredients()
  }, [])
  return (
    <>
      <AppHeader />
      <main className={stylesApp.main}>
        <div className={stylesApp.content}>
          <IngredientsContext.Provider value={{ ingredientsBurger, setIngredientsBurger }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </div>
      </main>
    </>
  );
}

export default App;
