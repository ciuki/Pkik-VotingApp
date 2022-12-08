import './App.scss';

import { Link } from 'react-router-dom';
import Main from './components/Main';
import React from 'react';
import logo from './logo.svg';

function App (): JSX.Element {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/main">Main</Link></li>
      </ul>
      <Main />
    </div>
  );
}

export default App;
