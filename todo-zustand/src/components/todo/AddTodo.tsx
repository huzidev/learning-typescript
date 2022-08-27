import React from 'react';
import { Input, Button, Col, Row } from 'antd';

export default function AddTodo () {
  return (
    <div>
        <Row justify='space-around'>
            <Col span={12}>
                <Input placeholder="Add todo" />
            </Col>
            <Col span={8}>
                <Button type="primary">Add Todo</Button>
            </Col>
        </Row>
    </div>
  )
}
