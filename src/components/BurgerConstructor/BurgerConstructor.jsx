import constructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { ingredientPropType } from '../../utils/prop-types'
import PropTypes, { func } from "prop-types";
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
BurgerConstructor.propTypes = {
    element: PropTypes.arrayOf(ingredientPropType.isRequired)
}
function BurgerConstructor({ element }) {
    const buns = React.useMemo(() => element.length > 0 && element.find((m) => m.type === "bun"), [element])
    const [active, setActive] = React.useState(false);
    const popupClose = () => {
        setActive(false)
    }

    const  popupOpen = () => {
        setActive(true)
    }
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
                    {element.map((item) => {
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
                <span className={`${constructorStyles.price} text text_type_main-large mr-2`}>18743<CurrencyIcon type="primary" /></span>
                <Button onClick={popupOpen} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {active && (<Modal close={popupClose}>
                <OrderDetails  />
            </Modal>)}
        </section>
    )
}

export default BurgerConstructor