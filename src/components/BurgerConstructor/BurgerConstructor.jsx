import constructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo } from 'react'
import { ingredientPropType } from '../../utils/prop-types'
import PropTypes, { func } from "prop-types";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { IngredientsContext, OrderNumberContext } from '../../services/ingredientsContext';
import { postOrderDetailsNumber } from '../../utils/api/api';
BurgerConstructor.propTypes = {
    ingredientsBurger: PropTypes.arrayOf(ingredientPropType.isRequired)
}
function BurgerConstructor() {
    const { ingredientsBurger } = React.useContext(IngredientsContext)
    const buns = React.useMemo(() => ingredientsBurger.length > 0 && ingredientsBurger.find((m) => m.type === "bun"), [ingredientsBurger])
    /*console.log(buns)*/
    const saucesFillingsIngredients = React.useMemo(() => ingredientsBurger.filter((m) => m.type !== 'bun'), [ingredientsBurger])
    /* console.log(saucesFillingsIngredients)*/
    const [active, setActive] = React.useState(false);

    const [orderNumber, setOrderNumber] = React.useState('')

    const popupClose = () => {
        setActive(false)
    }

    const popupOpen = () => {
        setActive(true)
        callOrderFetch()
    }

    const arrayOrderIngredients = React.useMemo(() => {
        return ingredientsBurger.map((m) => m._id)
    }, [ingredientsBurger])

    console.log(arrayOrderIngredients)

    function callOrderFetch() {
        postOrderDetailsNumber(arrayOrderIngredients)
            .then((result) => { setOrderNumber(result.order.number.toString()) })
            .catch(err => console.log(err));
    }
    const totalPrice = React.useMemo(() => {
        const priceIngredients = saucesFillingsIngredients.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
        return priceIngredients + buns.price * 2;
    }, [saucesFillingsIngredients, buns]);
    return (
        <section className={`${constructorStyles.container}`}>
            <div className={`${constructorStyles.content} pl-4 pr-4 pb-5 pt-5`}>
                <div className={constructorStyles.component}><ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                /></div>
                <ul className={`${constructorStyles.list}  custom-scroll`}>
                    {ingredientsBurger.map((item) => {
                        return item.type !== "bun" && (
                            <li key={item._id} className={constructorStyles.item}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                /></li>
                        )
                    })}
                </ul>
                <div className={constructorStyles.component}><ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns.name} (низ)`}
                    price={buns.price}
                    thumbnail={buns.image}
                />
                </div>
            </div>
            <div className={constructorStyles.items}>
                <span className={`${constructorStyles.price} text text_type_main-large mr-2`}>{totalPrice}<CurrencyIcon type="primary" /></span>
                <Button onClick={popupOpen} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
                {active && (<Modal close={popupClose}>
                    <OrderDetails />
                </Modal>)}
            </OrderNumberContext.Provider>
        </section>
    )
}

export default BurgerConstructor