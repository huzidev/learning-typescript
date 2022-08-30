import React, { useState } from 'react';

export default function AddToList() {

  const [input, setInput] = useState({
    name: "",
    age: "",
    note: ""
  })

  function handleInput() {
    
  }

  return (
    <div>
        Add To list
        <input 
            type="text"
            placeholder="Name"
            name="name"
            value={input.name}
            />
        <input 
            type="text"
            placeholder="Age"
            name="age"
            value={input.age}
            />
        <input 
            type="text"
            placeholder="Note (Optional)"
            name="note"
            value={input.note}
        />
    </div>
  )
}
