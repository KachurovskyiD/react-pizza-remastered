import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../index';

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
