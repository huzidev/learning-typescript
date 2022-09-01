import React from 'react';
import { Home } from './home/Home';
import { UseState } from './useState/UseState';
import { ShoppingCart } from './cart/index';
import Error from './error/Error';
import { GlobalStyles } from './styled-components/Global.styled';
import { YoursCart } from './cart/pages/YoursCart';
import { About } from './cart/pages/About';
import { Store } from './cart/pages/Store';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ShoppingCartProvider } from '../components/cart/context/ShoppingCartContext';
import { NavBar } from '../components/cart/navBar/NavBar';

export default function App(): JSX.Element {
  return (
    <div>
      <Router>
        <ShoppingCartProvider>
            <GlobalStyles />
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/state" element={<UseState />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/cart/about" element={<About />} />
                <Route path="/cart/store" element={<Store />} />
                <Route path="/cart/yours-cart" element={<YoursCart />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </ShoppingCartProvider>
      </Router>
    </div>
  )
}
