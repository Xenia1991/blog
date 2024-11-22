import { useDispatch, useSelector } from 'react-redux';
import { Pagination, ConfigProvider } from 'antd';

import { fetchArticlesThunk } from '../../redux/article-reducer';

import classes from './pagination.module.scss';

const Paginations = () => {
  const pageTotal = useSelector((state) => state.articles.articlesCount);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(fetchArticlesThunk((page - 1) * 5));
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
          defaultCurrent={1}
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
