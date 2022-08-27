import React from 'react';
import { Input, Button, Col, Row, Typography } from 'antd';

export default function AddTodo () {
  return (
    <div>
        <Typography.Title>
            Todo List
        </Typography.Title>
        <Row>
            <Col span={12}>
                <Input placeholder="Add todo" />
            </Col>
            <Col span={8}>
                <Button type="primary">Primary Button</Button>
            </Col>
        </Row>
    </div>
  )
}
