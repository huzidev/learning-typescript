import React, { useState } from 'react';

export default function AddToList() {

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
        ...input,
        [event.target.name]: event.target.value
    })
  }


  function handleClick() {
    
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
