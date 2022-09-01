import React from 'react';
import { Link } from 'react-router-dom';

export function Home(): JSX.Element {
  return (
    <div>
        <h3>
            Home page
            <ul>
                <li>
                    <Link to='/state'>useState</Link>
                </li>
            </ul>
        </h3>
    </div>
  )
}
