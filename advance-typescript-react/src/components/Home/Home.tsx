import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(): JSX.Element {
  return (
    <div>
        <h3>
            Home page
            <ul>
                <li>
                    <Link to='/state'>useState</Link>
                    <Link to='/shoppingCart'>shoppingCart</Link>
                </li>
            </ul>
        </h3>
    </div>
  )
}
