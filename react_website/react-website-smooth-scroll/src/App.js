//import React from 'react';
import './App.css';
import GlobalFonts from './fonts/fonts'
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
          <GlobalFonts />
      <Navbar />
    </Router>
  );
}

export default App;
