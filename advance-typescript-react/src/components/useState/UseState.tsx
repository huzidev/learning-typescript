import React from 'react';
import { useState } from 'react';

export default function UseState() {

  // defining types with useState
  const [number, setNumber] = useState<number>(0);
  const [state, setState] = useState<boolean>(false);
  
  // for increment number by one
  function inc() {
    setNumber((prevState) => prevState + 1);
  }
  
  function chnageState() {
    setState((prevState) => !prevState)
  }
  
  const showState = state ? 'True' : 'False'
  


  // for array of objects {}[]

  interface Data {
    name: string,
    age: number,
    // means note of type optional
    note?: string
  }

  // here if we din't used (DATA) which is ours interface then we cab't specify that whether is is array of number, array of strings, array of boolean IF we just used useState([])
  const [person, setPerson] = useState<Data>([])

  return (
    <div>
        Current Count is {number}
        <br />
        <button onClick={inc}>
            Add 1
        </button>
        <br />
        Current state is {showState}
        <br />
        <button onClick={chnageState}>
          Change State
        </button>
        <br />
        <input 
          type="text" 
          value={input}
          onChange={(event) => event.target.value}
        />
    </div>
  )
}
