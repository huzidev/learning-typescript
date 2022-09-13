import React from 'react';
import { Card, Col, ColProps, Space, SpaceProps, Typography } from 'antd';
import { cx } from 'alias';

import { responsive } from './data';

interface PageCardProps {
  loading: boolean;
  colProps?: ColProps;
  action?: () => void;
  actionLabel?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  align?: SpaceProps['align'];
}

function PageCardContent({
  title,
  align,
  action,
  loading,
  children,
  colProps,
  actionLabel,
}: PageCardProps): JSX.Element {
  return (
    <Col {...responsive} {...colProps}>
      <Card
        // title will be according to page content type since this PageCardContent component is IMPORTED at three different components resetPassword page, SendResetPassword page and VerifyUser page and in these components we are RECEIVING props here like title therefore title will be according to the page like for resetPassword page title will be Reset Password
        title={title}
        extra={
          // when user is at verification page then actionLabel will be Log Out and onClick={action} is already defined in src/pages/VerifyUser/index.tsx which is auth.signOut for Logout
          action &&
          actionLabel && (
            // for LOGOUT when user is at verification page
            <Typography.Link onClick={action} disabled={loading}>
              {actionLabel}
            </Typography.Link>
          )
        }
      >
        {console.log('ALIGN', align)}
        {/* align will br true when user is at (Verify User page) because at that page all the data is at align center */}
        {align ? (
          <Space direction="vertical" align={align} className={cx('space')} size="large">
            {/* children will show the data between header and footer */}
            {children}
          </Space>
        ) : (
          // if we didn't used this <></> then we don't have to use {} rather we'll then simply use children
          <>{children}</>
        )}
      </Card>
    </Col>
  );
}

PageCardContent.defaultProps = {
  actionLabel: null,
  colProps: {},
  action: null,
  align: null,
};

export default PageCardContent;
