import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setCategory } from '../../redux/slices/filtersSlice';
import { RootState } from '../../redux/store';

interface ICategories {
  items: string[];
}

const Categories: React.FC<ICategories> = React.memo(({ items }) => {
  const { category } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const handleActiveCategory = (index: number) => {
    dispatch(setCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {items.map((name, index) => (
          <li
            className={classNames('categories__item', {
              active: index === category,
            })}
            key={index}
            tabIndex={0}
            onClick={() => handleActiveCategory(index)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
