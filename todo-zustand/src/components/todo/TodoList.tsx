import React from 'react';
import useStore from '../store'
import { Input, Button, Col, Row, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export default function TodoList() {
  const store = useStore();
  return (
    <div>
      {store.todos.map((data) => (
        <div key={data.id}>
          <Input value={data.text} />
          <Checkbox 
            checked={data.done}
            onClick={() => store.toggle(data.id)}
          >
              Completed
          </Checkbox>
          <Input 
            value={data.text}
            onChange={(event) => store.update(data.id, event.target.value)}
          />
          <Button 
            type='primary'
            onClick={() => store.remove(data.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
