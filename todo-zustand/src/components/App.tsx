import React from 'react';
import { Col, Row } from 'antd';
import AddTodo from './todo/AddTodo';
import TodoList from './todo/TodoList';
import Top from './todo/Top';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div>
      <Col span={20}>
        <Top />
        <AddTodo />
        <TodoList />
      </Col>
    </div>
  )
}