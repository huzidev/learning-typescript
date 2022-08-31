import React from 'react';
import UseState from '../useState/UseState';
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
                        <Route path="/" element={<UseState />} />
                    </Routes>
                </Router>
            </li>
        </ul>
    </div>
  )
}
