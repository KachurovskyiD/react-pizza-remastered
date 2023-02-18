import React from 'react';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas, pizzasSelectors } from '../redux/slices/pizzasSlice';
import { setCurrentPage } from '../redux/slices/filtersSlice';
import { Categories, Sort, PizzaBlock, PizzaLoadingBlock, Pagination } from '../components';
import { RootState, useAppDispatch } from '../redux/store';

const categoriesNames = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі'];
const sortNames = [
  { name: 'популярності', type: 'rating' },
  { name: 'ціні', type: 'price' },
  { name: 'назві', type: 'name' },
];

const Home: React.FC = () => {
  const {
    category,
    sort: { type },
    search,
    currentPage,
  } = useSelector((state: RootState) => state.filters);

  const { loadingStatus } = useSelector((state: RootState) => state.pizzas);
  const pizzas = useSelector(pizzasSelectors.selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category,
        type,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, type, currentPage]);

  // URL-save block
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortNames.find((obj) => obj.type === params.type);
  //     if (sort) {
  //       params.sort = sort;
  //     }
  //     dispatch(
  //       setFilters({
  //         category: params.category,
  //         search: params.search,
  //         currentPage: params.currentPage,
  //         sort: params.sort,
  //       } as unknown as ISearchPizzaParams),
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    // if (!isSearch.current) {
    //   useAppDispatch(fetchPizzas({ category, type, currentPage, search }));
    // }
    dispatch(
      fetchPizzas({ category: String(category), type, currentPage: String(currentPage), search }),
    );
    isSearch.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, type, currentPage, search]);

  if (loadingStatus === 'error') {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', margin: '100px 0' }}>
          <h3 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '25px' }}>
            Виникла помилка
          </h3>
          <p style={{ fontSize: '20px' }}>Ми вже це виправляємо...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="filters">
        <div className="container">
          <div className="filters__wrapper">
            <Categories items={categoriesNames} />
            <Sort items={sortNames} />
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container">
          <h2 className="content__title">Всі піцци</h2>
          <div className="content__items">
            {loadingStatus === 'loading'
              ? [...Array(4)].map((_, index) => <PizzaLoadingBlock key={index} />)
              : pizzas.map((item: any) => <PizzaBlock key={item.id} {...item} />)}
          </div>
          <Pagination
            page={currentPage}
            onChangePage={(number) => dispatch(setCurrentPage(number))}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
