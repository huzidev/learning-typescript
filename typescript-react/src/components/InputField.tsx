import React from 'react'

// for all the types of props we are receiving
interface PropsTypes {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>; // just hover on setTodo part in react useState
}

export default function InputField({todo, setTodo}: PropsTypes): JSX.Element {
    return (
        <div>
            <form >
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
