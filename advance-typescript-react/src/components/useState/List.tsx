import React from 'react';
import { Data as Props } from './types'; 

interface DataTypes {
    person: Props
}

// for showing all the inserted data
export default function List<({ person }): JSX.Element {
  return (
    <div>
        {person.map((data) => (
            <div>
                <h3>
                    
                </h3>
            </div>
        )}
    </div>
  )
}
