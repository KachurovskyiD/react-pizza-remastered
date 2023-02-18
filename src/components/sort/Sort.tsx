import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setSort } from '../../redux/slices/filtersSlice';
import { RootState } from '../../redux/store';

import sortArrow from '../../assets/img/arrow-top.svg';

interface ISortItem {
  name: string;
  type: string;
}

interface ISort {
  items: ISortItem[];
}

const Sort: React.FC<ISort> = React.memo(({ items }) => {
  const [openModal, setOpenModal] = useState(false);
  const sortRef = useRef(null);
  const { sort } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSortType = (obj: ISortItem) => {
    dispatch(setSort(obj));
    setOpenModal(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const _event = event as MouseEvent & { path: Node[] };

    if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
      setOpenModal(false);
    }
  };

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <img
          className={classNames('sort__arrow', {
            active: openModal,
          })}
          src={sortArrow}
          alt="Arrow."
        />
        <b>Сортування по:</b>
        <span onClick={() => setOpenModal(!openModal)}>{sort.name}</span>
      </div>
      {openModal && (
        <div className="sort__popup">
          <ul>
            {items.map((obj, index) => (
              <li
                className={classNames('sort__popup-item', {
                  active: sort.type === obj.type,
                })}
                key={index}
                onClick={() => handleSortType(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
