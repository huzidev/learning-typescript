import { Card, Col, ColProps, Typography } from 'antd';

export interface FooterProps {
  fullWidth?: boolean;
}

function Footer({ fullWidth }: FooterProps): JSX.Element {
  const responsive: ColProps = { span: 22, offset: 1 };
  if (!fullWidth) {
    responsive.xl = { span: 16, offset: 4 };
  }

  return (
    <Card>
      <Col {...responsive}>
        <Typography.Text>© Copyright 2021 Happy Homes. All Rights Reserved</Typography.Text>
      </Col>
    </Card>
  );
}

Footer.defaultProps = {
  fullWidth: false,
};

export default Footer;
