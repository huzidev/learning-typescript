import { Input, Button, Col, Row } from 'antd';
// zustand store
import { useStore } from '../store';
import TodoList from './TodoList';

export default function AddTodo (): JSX.Element {
  const store = useStore();

  function addTodo() {
    store.newTodo.length <= 0
      ? window.alert("add some value, you can't add empty todo") 
      : store.add()
  }

  const classForDark = store.dark ? 'dark-mode' : 'light-mode'

  return (
    <div>
        <Row justify='space-around' className={classForDark}>
            <Col span={12}>
                <Input 
                  placeholder="New todo"
                  value={store.newTodo}
                  // setNewTodo function is taking only text(value) as a parameter and we've defined it in store/types.ts
                  onChange={(event) => store.setNewTodo(event.target.value)}
                  className={classForDark}
                />
            </Col>
            <Col span={8}>
                <Button 
                  type="primary"
                  onClick={addTodo}
                  className={classForDark}
                >
                  Add Todo
                </Button>
            </Col>
        </Row>
    </div>
  )
}
