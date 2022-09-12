import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.replace('/')}>
          Back Home
        </Button>
      }
    />
  );
}

export default NotFoundPage;
