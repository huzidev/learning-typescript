import React from 'react'

// for all the types of props we are receiving
interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>; // just hover on setTodo part in react useState
}

export default function InputField({todo, setTodo}: Props): JSX.Element {
    return (
        <div>
            <form >
                <input type="text" placeholder='task' name="" id="" />
                <button type='submit'>
                    Add 
                </button>
            </form>
        </div>
    )
}
