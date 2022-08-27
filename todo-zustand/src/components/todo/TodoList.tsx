import React from 'react';
import useStore from '../store'
import { Input, Button, Col, Row } from 'antd';

export default function TodoList() {
  const store = useStore();
  return (
    <div>
      {store.todos.map((data) => (
        <div key={1}>
          <Input value={todo.text} />
        </div>
      ))}
    </div>
  )
}
