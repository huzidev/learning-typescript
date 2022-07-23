import React from 'react'
import { Todo } from './Model'
import SingleTodo from './SingleTodo';

interface PropsTypes {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({todos, setTodos}: PropsTypes): JSX.Element {
    return (
        <div>
            {
                todos.map((data) => { // since todos with (s) is of type array which is going to store all todo, therefore ues mapping on todos not on todo
                    return (
                        <SingleTodo
                            key={data.id}
                            todo={data}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    )
                })
            }
        </div>
    )
}
