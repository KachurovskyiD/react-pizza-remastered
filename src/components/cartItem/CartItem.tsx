import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart, minusItem } from '../../redux/slices/cartSlice';

interface ICartItem {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

const CartItem: React.FC<ICartItem> = ({ id, imageUrl, name, type, size, price, count }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const handlePlusItem = () => {
    dispatch(addToCart({ id } as ICartItem));
  };

  const handleMinusItem = () => {
    dispatch(minusItem(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__left-block">
        <img className="cart-item__img" src={imageUrl} alt="Cart img." />
        <div className="cart-item__description">
          <h4 className="cart-item__title">{name}</h4>
          <span className="cart-item__options">
            {type} тісто, {size} см.
          </span>
        </div>
      </div>
      <div className="cart-item__right-block">
        <div className="cart-item__count">
          <button className="cart-item__count-btn cart-item__count-minus" onClick={handleMinusItem}>
            <svg
              width="10"
              height="2"
              viewBox="0 0 10 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4.04019 0.0399933H8.84019C9.37035 0.0399933 9.80019 0.469833 9.80019 0.999993C9.80019 1.53015 9.37035 1.95999 8.84019 1.95999H4.04019H1.1602C0.630035 1.95999 0.200195 1.53015 0.200195 0.999993C0.200195 0.469833 0.630035 0.0399933 1.1602 0.0399933H4.04019Z" />
            </svg>
          </button>
          <div className="cart-item__counter">{count}</div>
          <button className="cart-item__count-btn cart-item__count-plus" onClick={handlePlusItem}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" />
              <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" />
            </svg>
          </button>
        </div>
        <div className="cart-item__price">{price} ₴</div>
        <button className="cart-item__remove" onClick={() => handleRemoveFromCart()} type="button">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#D7D7D7" strokeWidth="2" />
            <path
              d="M19.7479 17.9557L17.4993 15.7071L19.7479 13.4585C20.1618 13.0446 20.1618 12.3734 19.7479 11.9595C19.334 11.5455 18.6628 11.5455 18.2488 11.9595L16.0002 14.2081L13.7516 11.9595C13.3377 11.5455 12.6665 11.5455 12.2526 11.9595C11.8386 12.3734 11.8386 13.0446 12.2526 13.4585L14.5012 15.7071L12.2526 17.9557C11.8386 18.3696 11.8386 19.0409 12.2526 19.4548C12.6665 19.8687 13.3377 19.8687 13.7516 19.4548L16.0002 17.2062L18.2488 19.4548C18.6628 19.8687 19.334 19.8687 19.7479 19.4548C20.1618 19.0409 20.1618 18.3696 19.7479 17.9557Z"
              fill="#D0D0D0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
