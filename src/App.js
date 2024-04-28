import logo from './logo.svg';
import './App.css';
import React from 'react';
import ChatButton from './ChatButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <ChatButton />
        
      </header>
    </div>
  );
}

export default App;
