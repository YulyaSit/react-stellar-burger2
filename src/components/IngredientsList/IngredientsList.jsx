import ingredientsStyle from '../BurgerIngredients/BurgerIngredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes, { func } from "prop-types";
import { ingredientsItemListPropType } from '../../utils/prop-types';
import { IngredientsContext } from '../../services/ingredientsContext';
import React from 'react'
IngredientsList.propTypes = {
    item: PropTypes.arrayOf(ingredientsItemListPropType),
    openIngredient: PropTypes.func.isRequired
}

function IngredientsList({ item, openIngredient }) {
    return (
            <div className={ingredientsStyle.item} onClick={() => openIngredient(item)}>
                <img src={`${item.image}`} alt={`${item.name}`} className={ingredientsStyle.image} />
                <div><span className={`${ingredientsStyle.price} text text_type_digits-default`}>{item.price}</span><CurrencyIcon type="primary" /></div>
                <p className={`${ingredientsStyle.paragraph} text text_type_main-default`} >{item.name}</p>
                <Counter size="small" />
            </div>
    )
}

export default IngredientsList