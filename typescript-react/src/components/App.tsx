import React, { useState } from 'react';
import { Todo } from './Model';
import InputField from './InputField';

export default function App(): JSX.Element {

    const [todo, setTodo] = useState<string>(""); // means initial state is Empty and type is string
    const [todos, setTodos] = useState<Todo[]>([]); // initial state is empty array and type is of array of todos whoms interface we've created in separate components called model.ts

    function handleAdd (event: React.FormEvent) {
        event.preventDefault()

        if (todo) { // means if user has write something in input tag then set state for setTodos because initially todo is empty
            setTodos([...todos, {
                id: Date.now(), // for generating random id
                todo: todo,
                isDone: false
            }])
            setTodo(""); // so after user add the item the input tag will be EMPTY automatically therefore setTodo ("") empty string
        }
    };

    return (
        <div>
            <h1>
                test
            </h1>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        </div>
    )
}