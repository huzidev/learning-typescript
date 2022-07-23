import React from 'react';
import { Todo } from './Model'

interface PropsStyle {
    todo: Todo; // Todo is importing from model where we've defined all the tyoes
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function SingleTodo({todo, todos, setTodos}: PropsStyle): JSX.Element {
    return (
        <div>

        </div>
    )
}
