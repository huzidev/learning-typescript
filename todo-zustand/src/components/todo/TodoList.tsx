import React from 'react';
import useStore from '../store'
import { Input, Button, Col, Row } from 'antd';

export default function TodoList() {
  const store = useStore();
  return (
    <div>
      {store.todos.map((data) => (
        <div key={data.id}>
          <Input value={data.text} />
        </div>
      ))}
    </div>
  )
}
