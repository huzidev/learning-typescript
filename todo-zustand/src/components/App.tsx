import React from 'react';
import AddTodo from './todo/AddTodo';
import Top from './todo/Top';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <div>
        <Top />
        <AddTodo />
    </div>
  )
}