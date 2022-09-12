import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';

function Logo(props: TitleProps): JSX.Element {
  return <Typography.Title {...props}>Happy Homes</Typography.Title>;
}

export default Logo;
