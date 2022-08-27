import { Col, Row, Typography } from 'antd';
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
                <Typography.Title>
                    Todo List
                </Typography.Title>
            </Col>
        </Row>
    </div>
  )
}
