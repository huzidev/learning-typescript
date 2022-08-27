import React from 'react';
import useStore from '../store'
import { Input, Button, Col, Row, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export default function TodoList() {
  const store = useStore();
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      {store.todos.map((data) => (
        <div key={data.id}>
          <Input value={data.text} />
          <Checkbox 
            onChange={onChange}
            checked={data.done}
            onClick={() => store.toggle(data.id)}
          >
              Checkbox
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
