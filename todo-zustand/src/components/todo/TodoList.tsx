import { useStore } from '../store'
import { Input, Button, Col, Row, Checkbox } from 'antd';

export default function TodoList (): JSX.Element {
  // Zustand store functions
  const store = useStore();
  console.log('is it?', store.todos);
  return (
    <div>
      {store.todos.map((data) => (
        <div key={data.id}>
          <Checkbox 
            checked={data.done}
            // toggle function is taking only id as a parameter and we've defined it in store/types.ts
            onClick={() => store.toggle(data.id)}
          >
              Completed
          </Checkbox>
          {/* this input have the text (TODO) which user have added and therefore we've used (update) function on it so user can update this todo */}
          <Input 
            value={data.text}
            // update function is taking id and text(value) as a parameter and we've defined it in store/types.ts
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
