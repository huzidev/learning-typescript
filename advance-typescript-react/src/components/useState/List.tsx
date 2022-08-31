import React from 'react';
import { Data as Props } from './types'; 

interface DataTypes {
    // because the types is an array of object
    person: Props[]
}

// for showing all the inserted data
export default function List({ person }: DataTypes): JSX.Element {
  return (
    <div>
        {person.map((data) => (
            <div>
                <h3>
                    {data.name}
                </h3>
                <h3>
                    {data.age}
                </h3>
                <h3>
                    {data.note}
                </h3>
            </div>
        ))}
    </div>
  )
}
