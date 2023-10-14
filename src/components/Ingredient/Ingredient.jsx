import ingredientsStyle from '../BurgerIngredients/BurgerIngredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientsItemListPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { func } from 'prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
Ingredient.propTypes = {
  element: ingredientsItemListPropType.isRequired,
};

function Ingredient({ element, openIngredient }) {
  const { bun, ingredients } = useSelector(store => store.burgerIngredientsConstructor)
  const [{ isDragging }, refDrag] = useDrag({
    type: "ingredient",
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  const counter = useMemo(() => {
    const id = ingredients.filter((item) => item._id === element._id)
    return id.length;
  }, [ingredients, element._id]);
  const bunsCounter = useMemo(() => {
    if (bun === null) {
      return 0;
    } else if (bun !== null && element._id === bun._id) {
      return 2;
    }
  }, [bun, element._id]);
  return (
    <div className={ingredientsStyle.item} onClick={() => openIngredient(element)} ref={refDrag} style={{ opacity }}>
      <img src={`${element.image}`} alt={`${element.name}`} className={ingredientsStyle.image} id={element._id} />
      <div><span className={`${ingredientsStyle.price} text text_type_digits-default`}>{element.price}</span><CurrencyIcon type="primary" /></div>
      <p className={`${ingredientsStyle.paragraph} text text_type_main-default`} >{element.name}</p>
      {element.type !== 'bun' ?
        (<Counter size="small" count={counter} />
        ) : (
          <Counter size="small" count={bunsCounter} />)}
    </div>
  )
}

export default Ingredient