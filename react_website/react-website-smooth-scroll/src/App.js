//import React from 'react';
// import './App.css';
// import GlobalFonts from './fonts/fonts'
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
            <Navbar />
      <Sidebar />
    </Router>
  );
}

export default App;
