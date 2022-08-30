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
    </div>
  )
}
