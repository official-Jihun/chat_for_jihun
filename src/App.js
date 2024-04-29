import happy_cat from './contents/happy-cat-happy-happy-cat.gif';
import './App.css';
import React from 'react';
import ChatButton from './ChatButton';
import BackgroundMusic from './BackgroundMusic';

function App() {
  return (
    <div className="App">
      <BackgroundMusic />
      <header className="App-header">
        <img src={happy_cat} lassName="happy_cat" alt="happy_cat" />
        
        <ChatButton />
        
      </header>
    </div>
  );
}

export default App;
