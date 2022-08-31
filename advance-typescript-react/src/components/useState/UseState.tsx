import React, { useState } from 'react';
import AddToList from './AddToList';
import List from './List';
import { Data } from './types';

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
  // here if we din't used (DATA) which is ours interface then we cab't specify that whether is is array of number, array of strings, array of boolean IF we just used useState([])
  // it is mandatory to use the (array sign []) with <Data[]> because we've to defined that it is {array of object} as interface is already as a type object because we've used {} curly braces
  // therefore we've used useState<Data[]>([]) and it is mandatory to use like this <Data[]>
  const [person, setPerson] = useState<Data[]>([])

  person.map((info) => (
    info.age
  ))

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
        {/* person from useState have the data like age, name and we've passed it as a props (BECAUSE) in List component we've used (map) method for displaying */}
        <List person={person}/>
        <AddToList person={person} setPerson={setPerson}/>
    </div>
  )
}
