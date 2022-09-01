import React from 'react';
import { Home } from './home/Home';
import { UseState } from './useState/UseState';
import { ShoppingCart } from './cart/index';
import Error from './error/Error';
import { GlobalStyles } from './styled-components/Global.styled';
import { Data } from './cart/pages/Data';
import { About } from './cart/pages/About';
import { Store } from './cart/pages/Store';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <div>
      <Router>
        <GlobalStyles />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/state" element={<UseState />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/cart/data" element={<Data />} />
              <Route path="/cart/about" element={<About />} />
              <Route path="/cart/store" element={<Store />} />
              <Route path="*" element={<Error />} />
          </Routes>
      </Router>
    </div>
  )
}
