import React from 'react'
import modalDetailsStyles from './OrderDetails.module.css'
import doneImage from '../../images/done.svg'


function OrderDetails() {
    return (
        <>
            <ul className={modalDetailsStyles.container}>
                <li className={`${modalDetailsStyles.number} text text_type_digits-large mt-4`}>034536</li>
                <li className={`${modalDetailsStyles.identifier} text text_type_main-default`}>идентификатор заказа</li>
                <li className='mt-15'><img src={doneImage} alt="done" /></li>
                <li className="text text_type_main-small mt-15">Ваш заказ начали готовить</li>
                <li className={`${modalDetailsStyles.wait} text text_type_main-small mt-2`}>Дождитесь готовности на орбитальной станции</li>
            </ul>
        </>
    )
}
export default OrderDetails