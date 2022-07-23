import React from 'react'

// for all the types of props we are receiving
interface PropsTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>; // just hover on setTodo part in react useState
    handleAdd: (event: React.FormEvent) => void; // for function types and the params here are same as we've used in handleAdd function in App.js
}

export default function InputField({todo, setTodo, handleAdd}: PropsTypes): JSX.Element {
    return (
        <div>
            <form onSubmit={handleAdd}>
                <input 
                    type="text"
                    value={todo}
                    onChange={(event) => setTodo(event.target.value)}
                    placeholder="task"
                 />
                <button type="submit">
                    Add 
                </button>
            </form>
        </div>
    )
}
