import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './navBar/NavBar';

export function ShoppingCart(): JSX.Element {
  return (
    <div>
      <NavBar />
      <br />
      <Link to='/'>
        Go bact to home
      </Link>
    </div>
  )
}
