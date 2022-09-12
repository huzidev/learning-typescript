import { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';

import { cx } from 'alias';

import Logo from 'components/Logo';

import './styles.less';

function PageLoader(): JSX.Element {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);

  return (
    <div id="page-loader">
      <div className={cx('content', { active: state })}>
        <Space size="large">
          <Logo level={1} />
          <Spin size="large" />
        </Space>
      </div>
    </div>
  );
}

export default PageLoader;
