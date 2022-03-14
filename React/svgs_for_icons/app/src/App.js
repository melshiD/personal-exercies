import logo from './logo.svg';
import BouncingBallsIcon from './Components/Icons/BouncingBallsIcon';
import React from 'react';
import CustomTextInput from "./Components/Icons/CustomTextInput";
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.flexBalls}>
    <BouncingBallsIcon />
    </div>
  );
}

export default App;
