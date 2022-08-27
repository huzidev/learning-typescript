import React from 'react';
import { Col, Row } from 'antd';
import AddTodo from './todo/AddTodo';
import Top from './todo/Top';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div>
      <Col span={20}>
        <Top />
        <AddTodo />
      </Col>
    </div>
  )
}