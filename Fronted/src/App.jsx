import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Navigation } from './components/Navigation.jsx'

import testImg from './img/empty_card.png'

function App() {

  return (
    <div className="container">
      <header className='header'>
        <Navigation />
      </header>
      
      Тут контент
    </div>
  )
}

export default App