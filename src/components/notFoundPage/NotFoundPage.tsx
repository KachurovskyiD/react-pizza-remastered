import React from 'react';
import { Link } from 'react-router-dom';

import styles from './notFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Сторінка не знайдена...</h1>
      <Link className={styles.back} to="/">
        Головна сторінка
      </Link>
    </div>
  );
};

export default NotFoundPage;
