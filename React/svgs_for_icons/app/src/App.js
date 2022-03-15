import BouncingBallsIcon from './Components/Icons/BouncingBallsIcon';
import React from 'react';
import classes from './App.module.css';
import MovingViewBox from './Components/Icons/MovingViewBox';
import IconViewBoxAnimationWrapper from './Components/Icons/IconViewBoxAnimationWrapper';
import IconTestChildren from './Components/Icons/IconTestChildren';

document.body.style = "background-color: black";

function App() {
  return (
    <div className={classes.flexBalls}>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    <IconViewBoxAnimationWrapper maskStopColor='black' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren shapeFillColor="white"/>
    </IconViewBoxAnimationWrapper>
    </div>
  );
}
// function App() {
//   return (
//     <React.Fragment>
//     <MovingViewBox />
//     </React.Fragment>
//   );
// }

export default App;
