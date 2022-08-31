import React, { useState } from 'react';
import { Data as Props } from './types';


interface DataTypes {
  // props[] have types name: string, age: number
  person: Props[]
  // we know that (setPerson) is function and for type if it we simply (HOVER) over the (setPerson) created in UseState.tsx components
  setPerson: React.Dispatch<React.SetStateAction<Props[]>>
}

// for adding data to list
export default function AddToList({ person, setPerson }: DataTypes): JSX.Element {

  const [input, setInput] = useState({
    name: "",
    age: "",
    note: ""
  });


  // now how do we get to know what can be the type for (event) here it's simple
  // we know that we are creating (handleInput) function for (onChange) in input tag so if we creates a function inside onChange like 
  // onChange={(event) => } then we'll not get any error and if we hover over the event here we can see the type which is (React.ChangeEvent<HTMLInputElement>) then simple past the type here
  // and remember we've used textarea for notes therefore we've used (union) for textarea
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setInput({
        // here ...input what ever the current input element is if we hover over ...input we can see some empty string with keys like name: "", age: ""
        ...input,
        [event.target.name]: event.target.value
    })
  }


  function handleClick() {
    if (input.name.length <= 0) {
        window.alert(`name field must be greater than 1 character`)
        return
      }
    else if (input.age.length <= 0) {
      window.alert(`name field must be greater than 1 character`)
      return
    }
    // note? is optional
    else if (input.note.length <= 0) {
      return "NIL"
    }

    // for adding data to array
    setPerson([
      // all previous data in array
      ...person,
      {
        name: input.name,
        age: input.age,
        note: input.note
      }
    ])

  }

  return (
    <div>
        Add To list
        <br />
        <input 
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleInput}
        />
        <br />
        <input 
            type="text"
            placeholder="Age"
            name="age"
            value={input.age}
            onChange={handleInput}
        />
        <br />
        <textarea 
            placeholder="Note (Optional)"
            name="note"
            value={input.note}
            onChange={handleInput}
        />
        <br />
        <button onClick={handleClick}>
            Add to list
        </button>
    </div>
  )
}
