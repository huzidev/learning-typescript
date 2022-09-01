import React from 'react';
import { Nav } from '../../styled-components/Nav.styled';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function NavBar(): JSX.Element {
  const { cartQuantity } = useShoppingCart()
  return (
    <>
      <Nav>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/cart/data' className='link'>
          Data
        </Link>
        <Link to='/cart/about' className='link'>
          About
        </Link>
        <Link to='/cart/store'className='link'>
          Store
        </Link>
        <button>
          Yours Cart 
          <div>
            {cartQuantity}
          </div>
        </button>
      </Nav>
    </>
  )
}