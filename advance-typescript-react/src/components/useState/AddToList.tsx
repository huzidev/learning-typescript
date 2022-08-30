import React, { useState } from 'react';

export default function AddToList() {

  const [input, setInput] = useState({
    name: "",
    age: "",
    note: ""
  });

  let name, value;
  
  function handleInput(event: React.FormEvent) {
    name = event.target.name;
    value = event.target.value;
    setInput({
        ...input,
        [name]: value
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
