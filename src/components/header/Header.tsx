import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { Search } from '../index';

import logo from '../../assets/img/pizza-logo.svg';
import cart from '../../assets/img/cart.svg';

const Header = () => {
  const { items, totalCount, totalPrice } = useSelector((state: RootState) => state.cart);
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo" to="/">
            <img className="header__logo-img" src={logo} alt="Logo." />
            <div className="header__logo-text">
              <h1>REACT PIZZA</h1>
              <h2>самая вкусная пицца во вселенной</h2>
            </div>
          </Link>
          {location.pathname !== '/cart' && (
            <>
              <Search />
              <Link className="header__cart button" to="/cart">
                <div className="header__cart-price">{totalPrice} ₴</div>
                <div className="header__cart-img">
                  <img src={cart} alt="Cart." />
                  {totalCount}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
