import { useDispatch, useSelector } from 'react-redux';
import { Pagination, ConfigProvider } from 'antd';
import { useMemo } from 'react';

import { fetchArticlesThunk, articlesReducerSlice } from '../../redux/article-reducer';

import classes from './pagination.module.scss';

const Paginations = () => {
  const pageTotal = useSelector((state) => state.articles.articlesCount);
  const currentPage = useSelector((state) => state.articles.page);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const token = useMemo(() => {
    let userToken;
    if (user) {
      userToken = user.token;
    } else {
      userToken = JSON.parse(localStorage.getItem('token'));
    }
    return userToken;
  }, [user]);

  const handlePageChange = (page) => {
    dispatch(articlesReducerSlice.actions.changePage(page));
    const info = {
      token,
      offset: page === 1 ? 0 : (page - 1) * 5,
    };
    dispatch(fetchArticlesThunk(info));
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.pagination}>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: '#EBEEF3',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          current={currentPage}
          total={pageTotal}
          defaultPageSize={5}
          onChange={handlePageChange}
          showSizeChanger={false}
          align="center"
        />
      </ConfigProvider>
    </div>
  );
};

export default Paginations;
