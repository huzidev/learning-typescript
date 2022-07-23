import React from 'react'

// for all the types of props we are receiving
interface PropsTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>; // just hover on setTodo part in react useState
    handleAdd: () => void; // for function types
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
