import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UseState from './useState/UseState';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/" element={<UseState />} />
        </Routes>
      </Router>
    </div>
  )
}
