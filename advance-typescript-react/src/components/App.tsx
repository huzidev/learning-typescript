import React from 'react';
import Home from './home/Home';
import UseState from './useState/UseState';
import ShoppingCart from './cart/ShoppingCart';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <div>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/state" element={<UseState />} />
              <Route path="/shoppingCart" element={<ShoppingCart />} />
          </Routes>
      </Router>
    </div>
  )
}
