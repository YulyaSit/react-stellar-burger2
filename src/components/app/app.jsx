import stylesApp from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <main className={stylesApp.main}>
          <div className={stylesApp.content}>
              <BurgerIngredients />
              <BurgerConstructor />
          </div>
        </main>
      </DndProvider>
  );
}

export default App;
