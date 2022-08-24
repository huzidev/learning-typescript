import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import { cx } from 'alias';

import Page from 'components/Page';

import './styles.less';

// if user is banned then this page will be shown to user when user tries to loggedIn
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
            <Button type="primary" onClick={() => window.location.reload()}>
              Go Back
            </Button>
          }
        />
      </div>
    </Page>
  );
}

export default BannedUserPage;
