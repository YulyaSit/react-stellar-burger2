import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT_BURGER } from "../../services/actions/actions";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react'
import constructorStyles from '../BurgerConstructor/BurgerConstructor.module.css'
import { ingredientsItemListPropType } from "../../utils/prop-types";
import { func } from "prop-types";

export const DragIngredientBurger = ({ element, moveIngredientBurger }) => {
    const dispatch = useDispatch()
    const { ingredients } = useSelector(store => store.burgerIngredientsConstructor);
    const index = ingredients.indexOf(element);
    const [{ isDragging }, drag] = useDrag({
        type: "item",
        item: () => ({ element, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const ref = useRef(null);
    const opacity = isDragging ? 0 : 1;
    const [, drop] = useDrop({
        accept: "item",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveIngredientBurger(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const deleteItem = (e) => {
        e.preventDefault()
        return dispatch({
            type: DELETE_INGREDIENT_BURGER,
            key: element.key,
        });
    };
    const dragDropRef = drag(drop(ref));
    return (
        <div
            ref={dragDropRef}
            style={{ opacity }}
            className={constructorStyles.item}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
                handleClose={(e) => deleteItem(e)}
            />
        </div>
    )
}


DragIngredientBurger.propTypes = {
    element: ingredientsItemListPropType,
    moveIngredientBurger: func
  };