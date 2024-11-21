import { Pagination, ConfigProvider } from 'antd';

import classes from './pagination.module.scss';

const Paginations = () => {
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
        <Pagination defaultCurrent={1} total={25} defaultPageSize={5} />
      </ConfigProvider>
    </div>
  );
};

export default Paginations;
