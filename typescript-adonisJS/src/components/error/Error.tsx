import React from 'react';
import { Link } from 'react-router-dom';

export default function Error(): JSX.Element {
  return (
    <div>
        404 Page not found!
        <br />
        <Link to='/'>
          Go bact to home
        </Link>
    </div>
  )
}
