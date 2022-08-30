import React from 'react';
import { Col, Row } from 'antd';
import AddTodo from './todo/AddTodo';
import TodoList from './todo/TodoList';
import Top from './todo/Top';
import 'antd/dist/antd.css';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './styled-components/Global.styled';

export default function App() {

  const theme = {
    colors : {
        fontColor : "blue",
        backgroundColor : "aqua",
        hoverColorBG : "purple",
        hoverColorF : "white"
    }
}

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Col span={20}>
          <Top />
          <AddTodo />
          <TodoList />
        </Col>
      </div>
    </ThemeProvider>
  )
}