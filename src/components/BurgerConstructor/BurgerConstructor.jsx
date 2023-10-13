import constructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo, useCallback } from 'react'
import { ingredientPropType } from '../../utils/prop-types'
import PropTypes, { func } from "prop-types";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { OPEN_POPUP_ORDER_DETAILS, CLOSE_POPUP_ORDER_DETAILS, postOrderNumber, DELETE_INGREDIENT_BURGER } from '../../services/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBunBurger, addIngredientBurger } from '../../services/reducers/burgerConstructorReducer';
import { v4 as uuidv4 } from "uuid";
import { moveIngredient } from '../../services/reducers/burgerConstructorReducer';
import { DragIngredientBurger } from '../DragIngredient/DragIngredient.jsx'

/*urgerConstructor.propTypes = {
    ingredientsBurger: PropTypes.arrayOf(ingredientPropType.isRequired)
}*/

function BurgerConstructor() {
    const { bun, ingredients } = useSelector(store => store.burgerIngredientsConstructor)
    const dispatch = useDispatch()
    const { popupIsActive } = useSelector(store => store.burgerIngredientsConstructor)
    const saucesFillingsIngredients = React.useMemo(() => ingredients.filter((m) => m.type !== 'bun'), [ingredients])
    function handlerDrop(item) {
        if (item.type === "bun") {
            return dispatch(addBunBurger(item));
        } else if (item.type !== "bun") {
            return dispatch(addIngredientBurger(item, uuidv4()));
        }
    }
    const [, drop] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            handlerDrop(itemId);
        },
        collect: (monitor) => ({
            monitor: monitor.canDrop() && monitor.isOver(),
        }),
    });
    const popupClose = () => {
        dispatch({
            type: CLOSE_POPUP_ORDER_DETAILS
        })
    }
    const ingredientsBurger = useMemo(
        () => ingredients.map((m) => m._id),
        [ingredients]
    );

    const popupOpen = () => {
        const bunsAndIngredientsBurger = [...ingredientsBurger, bun._id];
        dispatch({
            type: OPEN_POPUP_ORDER_DETAILS
        })
        dispatch(postOrderNumber(bunsAndIngredientsBurger))
    }
    const moveIngredientBurger = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(moveIngredient(dragIndex, hoverIndex));
        },
        [dispatch]
    );
    function priceBuns() {
        if (bun) {
            return 2 * bun.price
        } else {
            return 0
        }
    }
    const totalPrice = React.useMemo(() => {
        const priceIngredientsBurger = saucesFillingsIngredients.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
        return priceIngredientsBurger + priceBuns()
    }, [saucesFillingsIngredients, bun]);

    return (
        <section className={`${constructorStyles.container}`}>
            <div className={`${constructorStyles.content} pl-4 pr-4 pb-5 pt-5`} ref={drop}>
                <div className={constructorStyles.component}>
                    {bun && (<ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        element={bun}
                    />)}</div>
                <ul className={`${constructorStyles.list}  custom-scroll`}>
                    {ingredients.map((item, key) => (
                        <li key={key}>
                            <DragIngredientBurger
                                element={item}
                                moveIngredientBurger={moveIngredientBurger}
                            />
                        </li>
                    ))}
                </ul>
                <div className={constructorStyles.component}>{bun && (<ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    element={bun}
                />)}
                </div>
            </div>
            <div className={constructorStyles.items}>
                <span className={`${constructorStyles.price} text text_type_main-large mr-2`}>{totalPrice}<CurrencyIcon type="primary" /></span>
                <Button onClick={popupOpen} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {popupIsActive && (<Modal close={popupClose}>
                <OrderDetails />
            </Modal>)}
        </section>
    )
}
export default BurgerConstructor