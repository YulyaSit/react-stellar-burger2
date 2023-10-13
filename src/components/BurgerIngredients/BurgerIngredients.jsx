import ingredientsStyle from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import Ingredient from '../Ingredient/Ingredient'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux'
import { useInView } from "react-intersection-observer";
import { getIngredientsItems, CLOSE_POPUP_INGREDIENT, OPEN_POPUP_INGREDIENT, DELETE_OPTIONS_OF_INGREDIENT  } from '../../services/actions/actions'
import { openInfoIngredient } from '../../services/reducers/ingredientDetailsReducer'

function BurgerIngredients() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getIngredientsItems())
    }, [dispatch])
    const { openIngredientPopup } = useSelector( store => store.ingredients)
    const {ingredientsBurger} = useSelector(state => state.ingredients)
    const { infoIngredient } = useSelector(store => store.ingredients)
    const [current, setCurrent] = React.useState('one')
    const buns = React.useMemo(() => ingredientsBurger.filter((m) => m.type === "bun"), [ingredientsBurger]);
    const sauces = React.useMemo(() => ingredientsBurger.filter((m) => m.type === "sauce"), [ingredientsBurger])
    const fillings = React.useMemo(() => ingredientsBurger.filter((m) => m.type === "main"), [ingredientsBurger])
    const [oneRef, oneInView] = useInView({ threshold: 0.5 });
    const [twoRef, twoInView] = useInView({ threshold: 1 });
    const [threeRef, threeInView] = useInView({ threshold: 0.2 });
    function openPopupIngrredient(ingredient) {
        dispatch({
            type: OPEN_POPUP_INGREDIENT
        })
        dispatch(openInfoIngredient(ingredient))
    }

    function closePopupIngredient() {
        dispatch({
            type: CLOSE_POPUP_INGREDIENT
        })
        dispatch({
            type: DELETE_OPTIONS_OF_INGREDIENT
        })
    }

    return (
        <>
            <section className={ingredientsStyle.ingredientsContainer}>
                <h2 className={`${ingredientsStyle.title} text text_type_main-large`}>Соберите бургер</h2>
                <div className={ingredientsStyle.tab}>
                    <Tab value="One" active={oneInView === true} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="Two" active={twoInView === true} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="Three" active={threeInView === true} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={`${ingredientsStyle.container} custom-scroll`}>
                    <h3 className={`${ingredientsStyle.subtitle} text text_type_main-default`}>Булки</h3>
                    <ul className={ingredientsStyle.list} ref={oneRef}>
                        {buns.map((ingredientsBurger) => (
                            <li key={ingredientsBurger._id}>
                                <Ingredient element={ingredientsBurger} openIngredient={openPopupIngrredient} />
                            </li>
                        ))}
                    </ul>
                    <h3 className={`${ingredientsStyle.subtitle} text text_type_main-default`}>Соусы</h3>
                    <ul className={ingredientsStyle.list} ref={twoRef}>
                        {sauces.map((ingredientsBurger) => (
                            <li key={ingredientsBurger._id}>
                                <Ingredient element={ingredientsBurger} openIngredient={openPopupIngrredient} />
                            </li>
                        ))}
                    </ul>
                    <h3 className={`${ingredientsStyle.subtitle} text text_type_main-default`}>Начинки</h3>
                    <ul className={ingredientsStyle.list} ref={threeRef}>
                        {fillings.map((ingredientsBurger) => (
                            <li key={ingredientsBurger._id}>
                                <Ingredient element={ingredientsBurger} openIngredient={openPopupIngrredient} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {openIngredientPopup && (<Modal title={"Детали ингредиента"} close={closePopupIngredient}>
                <IngredientDetails />
            </Modal>)}
        </>
    )
}

export default BurgerIngredients