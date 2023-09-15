import ingredientsStyle from '../burgerIngredients/burgerIngredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientsItemListPropType } from '../../utils/prop-types';

Ingredient.propTypes = {
    item: ingredientsItemListPropType.isRequired,
  };

function Ingredient({ item, openIngredient }) {
    return (
            <div className={ingredientsStyle.item} onClick={() => openIngredient(item)}>
                <img src={`${item.image}`} alt={`${item.name}`} className={ingredientsStyle.image} id={item._id} />
                <div><span className={`${ingredientsStyle.price} text text_type_digits-default`}>{item.price}</span><CurrencyIcon type="primary" /></div>
                <p className={`${ingredientsStyle.paragraph} text text_type_main-default`} >{item.name}</p>
                <Counter size="small" />
            </div>
    )
}

export default Ingredient