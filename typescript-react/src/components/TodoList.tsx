import React from 'react'
import { Todo } from './Model'

interface PropsTypes {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({todos, setTodos}: PropsTypes): JSX.Element {
    return (
        <div>

        </div>
    )
}
