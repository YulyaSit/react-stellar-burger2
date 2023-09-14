
import ingredientStyles from './IngredientDetails.module.css'
import { ingredientsDetailsPopupPropType } from '../../utils/prop-types'
import PropTypes from 'prop-types' 
IngredientDetails.propTypes = {
    options: PropTypes.arrayOf(ingredientsDetailsPopupPropType)
}


function IngredientDetails({ options }) {
    return (
        <>
            <div className={ingredientStyles.container}>
                <img src={options.image} className={ingredientStyles.image} alt={options.name} />
                <p className={`${ingredientStyles.subtitle} mt-4 text text_type_main-default`}>{options.name}</p>
                <ul className={`${ingredientStyles.items} text_color_inactive`}>
                    <li className={`${ingredientStyles.item} ${ingredientStyles.item_size_big} text text_type_main-small`}>
                        <span>Калории, ккал</span>
                        <span className={`${ingredientStyles.number} text text_type_digits-default`}>{options.calories}</span></li>
                    <li className={`${ingredientStyles.item} text text_type_main-small`}>
                        <span>Белки, г</span>
                        <span className={`${ingredientStyles.number} text text_type_digits-default`}>{options.proteins}</span></li>
                    <li className={`${ingredientStyles.item} text text_type_main-small`}>
                        <span>Жиры, г</span>
                        <span className={`${ingredientStyles.number} text text_type_digits-default`}>{options.fat}</span></li>
                    <li className={`${ingredientStyles.item} text text_type_main-small`}>
                        <span>Углеводы, г</span>
                        <span className={`${ingredientStyles.number} text text_type_digits-default`}>{options.carbohydrates}</span></li>
                </ul>
            </div>
        </>
    )
}

export default IngredientDetails