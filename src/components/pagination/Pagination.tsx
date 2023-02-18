import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

interface IPagination {
  page: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ page, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={page - 1}
    />
  );
};

export default Pagination;
