import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, ICartItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

export interface IPizzaBlock {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
}

const PizzaBlock: React.FC<IPizzaBlock> = ({ id, imageUrl, name, types, sizes, price }) => {
  const availableTypes = ['Тонка', 'Традиційна'];
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items.find((obj) => obj.id === id));

  const addedCount = cartItem ? cartItem.count : 0;

  const handleActiveType = (index: number) => {
    setActiveType(types[index]);
  };

  const handleActiveSize = (index: number) => {
    setActiveSize(sizes[index]);
  };

  const onAddToCart = () => {
    const newItem: ICartItem = {
      id,
      imageUrl,
      name,
      type: availableTypes[activeType],
      size: activeSize,
      price,
      count: 0,
    };
    dispatch(addToCart(newItem));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__img" src={imageUrl} alt="Pizza." />
      <h3 className="pizza-block__title">{name}</h3>
      <div className="pizza-block__selectors">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => handleActiveType(index)}
              className={classNames({
                active: activeType === type,
              })}>
              {availableTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => handleActiveSize(index)}
              className={classNames({
                active: activeSize === size,
              })}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price"> Ціна: {price} ₴</div>
        <button className="pizza-block__btn" onClick={onAddToCart} type="button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
          </svg>
          <span>Додати</span>
          {addedCount > 0 && <b>{addedCount}</b>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
