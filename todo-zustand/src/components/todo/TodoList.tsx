import React from 'react';
import useStore from '../store'
import { Input, Button, Col, Row, Checkbox } from 'antd';

export default function TodoList() {
  const store = useStore();
  return (
    <div>
      {store.todos.map((data) => (
        <div key={data.id}>
          <Input value={data.text} />
          <Checkbox 
            checked={data.done}
            // toggle function is taking only id as a parameter and we've defined it in store/types.ts
            onClick={() => store.toggle(data.id)}
          >
              Completed
          </Checkbox>
          <Input 
            value={data.text}
            // toggle function is taking id and text as a parameter and we've defined it in store/types.ts
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
