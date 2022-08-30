import React from 'react';
import { Col, Row } from 'antd';
import AddTodo from './todo/AddTodo';
import TodoList from './todo/TodoList';
import Top from './todo/Top';
import 'antd/dist/antd.css';
import { useStore } from './store/index';
import { GlobalStyles } from './styled-components/Global.styled';
import { Tets } from './styled-components/Container.styled';

export default function App (): JSX.Element {
  const store = useStore()

  const dark = store.dark;

  return (
    <>
      <GlobalStyles />
      <Tets dark={dark}>
        <Col span={20}>
          <Top />
          <AddTodo />
          <TodoList />
        </Col>
      </Tets>
    </>
  )
}