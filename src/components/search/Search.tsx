import React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearch } from '../../redux/slices/filtersSlice';

import styles from './search.module.scss';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 500),
    [],
  );

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClearInput = () => {
    setSearchValue('');
    dispatch(setSearch(''));
  };

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"></line>
      </svg>
      <input
        className={styles.input}
        value={searchValue}
        onChange={onChangeInput}
        type="text"
        placeholder="Пошук піцци..."
      />
      {searchValue && (
        <svg
          className={styles.clear}
          onClick={onClearInput}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
