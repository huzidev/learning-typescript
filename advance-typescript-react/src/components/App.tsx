import React from 'react';
import { Home } from './home/Home';
import { UseState } from './useState/UseState';
import Error from './error/Error';
import { GlobalStyles } from './styled-components/Global.styled';

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
            <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}
