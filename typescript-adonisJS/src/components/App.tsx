import React from 'react';
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
            <Route path="/home" element={<UseState />} />
            <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}
