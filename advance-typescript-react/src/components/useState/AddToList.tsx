import React, { useState } from 'react';

export default function AddToList() {

  const [input, setInput] = useState({
    name: "",
    age: "",
    note: ""
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({
        ...input,
        [e.target.name]: e.target.value
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
