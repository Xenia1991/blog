import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './loader.module.scss';

const Loader = () => {
  return (
    <div className={classes['loader-container']}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default Loader;
