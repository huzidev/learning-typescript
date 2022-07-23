import React, { useState } from 'react';
import { Todo } from './Model'

interface PropsStyle {
    todo: Todo; // Todo is importing from model where we've defined all the tyoes
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function SingleTodo({todo, todos, setTodos}: PropsStyle): JSX.Element {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    function handelComplete(id: number) {
        setTodos(
            todos.map((todo) => // if user clicked in complete todo then we'll check the id of that todo on which user clicked
            // and compares it with the id we've assigned as parameter and change the isDone from false to true
                todo.id === id ? { ...todo, isDone: !todo.isDone} : todo // if the id doesn't match then just show todo
            )
        )
    }

    function handelDelete(id:number) {
        setTodos(
            todos.filter((todo) => todo.id !== id) // means all the other todos will remains except the one whoms id match
        )
    }

    function handleEdit(event: React.FormEvent, id: number) {
        event.preventDefault()

        setTodos(
            todos.map((todo) => (todo.id === id ? {...todo, todo: editTodo}: todo))
        )
        setEdit(false)
    }

    return (
        <div>
            <form onSubmit={(event) => handleEdit(event, todo.id) }>
                {
                    edit 
                        ? (
                            <input 
                                value={editTodo}
                                onChange={(event) => setEditTodo(event.target.value)}
                            /> // so the before value will remain and we can add new value with the previous value already present
                            // because in useState editTodo have all the values of todo we've add
                        )
                        : (
                            todo.isDone
                                ? (
                                    <span>
                                        <p>
                                            Completed
                                        </p>
                                        {todo.todo}
                                    </span>
                                )
                                : (
                                    <span>
                                        {todo.todo}
                                    </span>
                                )
                        )
                }
                <span onClick={ () => {
                    if (!edit && !todo.isDone) { // !todo.isDone means if task is not completed because when todo.isDone is true means task completed
                        setEdit(!edit) // !edit will change the state to opposite form
                    }
                }
                }>
                    Edit
                </span>
                <span onClick={() => handelDelete(todo.id)}>
                    Delete
                </span>
                <span onClick={() => handelComplete(todo.id)}>
                    Complete
                </span>
            </form>
        </div>
    )
}
