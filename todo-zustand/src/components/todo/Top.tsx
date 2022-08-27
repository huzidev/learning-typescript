import { Col, Row, Typography } from 'antd';
import LightModeIcon from '@mui/icons-material/LightMode';
import React from 'react';

export default function Top() {
  return (
    <div>
        <Row>
            <Col span={18}>
                <Typography.Title>
                    Todo List
                </Typography.Title>
            </Col>
            <Col span={6}>
                <LightModeIcon />
            </Col>
        </Row>
    </div>
  )
}
