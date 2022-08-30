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
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
        ...input,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div>
        Add To list
        <input 
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            onChange={handleInput}
            />
        <input 
            type="text"
            placeholder="Age"
            name="age"
            value={input.age}
            onChange={handleInput}
            />
        <input 
            type="text"
            placeholder="Note (Optional)"
            name="note"
            value={input.note}
            onChange={handleInput}
        />
    </div>
  )
}
