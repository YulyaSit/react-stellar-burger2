import stylesApp from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from 'react'
import { getIngredients } from '../../utils/api/api.js'

function App() {
  const [ingredients, setIngredients] = React.useState([])
  React.useEffect(() => {
    getIngredients()
      .then((result) => {
        (setIngredients(result.data))
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
          <BurgerIngredients ingredientsBurger={ingredients} />
          <BurgerConstructor element={ingredients} />
        </div>
      </main>
    </>
  );
}

export default App;
