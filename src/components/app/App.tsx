import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import { Home, Cart } from '../../pages';
import { NotFoundPage } from '../index';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
