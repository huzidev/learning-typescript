import React from 'react';
import UseState from '../useState/UseState';
import ShoppingCart from '../shoppingCart/shoppingCart';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div>
        <h3>
            Home page
        </h3>
        <ul>
            <li>
                <Router>
                    <Routes>
                        <Route path="/State" element={<UseState />} />
                        <Route path="/ShoppingCart" element={<ShoppingCart />} />
                    </Routes>
                </Router>
            </li>
        </ul>
    </div>
  )
}
