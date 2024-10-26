import React from "react";
import Chatbot from './components/Chatbot';
import './App.css'; // Import the CSS file for styles

function App() {
  return (
    <div className="App">
      <h1 className="app-title">WellCo | Your Wellness Companion</h1>
      <Chatbot />
    </div>
  );
}

export default App;