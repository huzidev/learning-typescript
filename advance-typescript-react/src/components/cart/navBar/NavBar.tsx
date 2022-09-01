import React from 'react';
import { Nav } from '../../styled-components/Nav.styled';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
      <Nav>
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
            3 items
          </div>
        </button>
      </Nav>
  )
}