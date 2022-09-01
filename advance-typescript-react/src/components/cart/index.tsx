import React from 'react';
import { Link } from 'react-router-dom';

export function ShoppingCart(): JSX.Element {
  return (
    <div>
      shoppingCart
      <br />
      <Link to='/'>
        Go bact to home
      </Link>
    </div>
  )
}
