import { Input, Button, Col, Row } from 'antd';
// zustand store
import { useStore } from '../store';

export default function AddTodo () {
  const store = useStore();

  function addTodo() {
    store.add()
  }

  return (
    <div>
        <Row justify='space-around'>
            <Col span={12}>
                <Input 
                  placeholder="New todo"
                  value={store.newTodo}
                  // setNewTodo function is taking only text(value) as a parameter and we've defined it in store/types.ts
                  onChange={(event) => store.setNewTodo(event.target.value)}  
                />
            </Col>
            <Col span={8}>
                <Button 
                  type="primary"
                  onClick={addTodo}
                >
                  Add Todo
                </Button>
            </Col>
        </Row>
    </div>
  )
}
