import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntAvatar } from 'antd';

export interface AvatarProps {
  size: number;
  user?: {
    avatar?: string;
  };
}

// default avatar will be shown in when user clicked on view profile
function Avatar({ user, size }: AvatarProps): JSX.Element {
  if (!user?.avatar) {
    return <AntAvatar size={size} icon={<UserOutlined />} />;
  }
  return <div />;
}

Avatar.defaultProps = {
  size: 80,
};

export default Avatar;
