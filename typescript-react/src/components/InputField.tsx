import React from 'react'

// for all the types of props we are receiving
interface Props {

}

export default function InputField({}) {
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
