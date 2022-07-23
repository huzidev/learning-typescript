import React, { useState } from 'react';
import InputField from './InputField';

export default function App(): JSX.Element {

    const [todo, setTodo] = useState<string>(""); // means initial state is Empty String

    return (
        <div>
            <h1>
                test
            </h1>
            <InputField todo={todo} setTodo={setTodo}/>
        </div>
    )
}