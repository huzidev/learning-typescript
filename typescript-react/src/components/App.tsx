import React, { useState } from 'react';
import { Todo } from './Model';
import InputField from './InputField';

export default function App(): JSX.Element {

    const [todo, setTodo] = useState<string>(""); // means initial state is Empty and type is string
    const [todos, setTodos] = useState<Todo[]>([]); // initial state is empty array and type is of array of todos whoms interface we've created in separate components called model.ts

    function handleAdd () {

    }

    return (
        <div>
            <h1>
                test
            </h1>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        </div>
    )
}