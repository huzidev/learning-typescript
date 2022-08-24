import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import { cx } from 'alias';

import Page from 'components/Page';

import './styles.less';

function BannedUserPage(): JSX.Element {
  const history = useHistory();
  return (
    <Page header footer>
      <div id="banned-page" className={cx('g-full-page')}>
        <Result
          status="500"
          title="User banned "
          subTitle="Cannot process, User is banned."
          extra={
            <Button type="primary" onClick={() => history.replace('/')}>
              Back Home
            </Button>
          }
        />
        ,
      </div>
    </Page>
  );
}

export default BannedUserPage;
