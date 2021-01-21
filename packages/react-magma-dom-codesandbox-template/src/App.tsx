import * as React from 'react';
import './styles.css';
import { GlobalStyles } from 'react-magma-dom';
import { Example } from './Example';

export default function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Example />
    </div>
  );
}
