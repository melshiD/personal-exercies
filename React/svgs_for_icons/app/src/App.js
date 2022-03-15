import BouncingBallsIcon from './Components/Icons/BouncingBallsIcon';
import React from 'react';
import classes from './App.module.css';
import MovingViewBox from './Components/Icons/MovingViewBox';
import IconViewBoxAnimationWrapper from './Components/Icons/IconViewBoxAnimationWrapper';
import IconTestChildren from './Components/Icons/IconTestChildren';

function App() {
  return (
    <React.Fragment>
    <IconViewBoxAnimationWrapper maskStopColor='white' viewBoxWidth="240" viewBoxHeight="90">
      <IconTestChildren />
    </IconViewBoxAnimationWrapper>
    </React.Fragment>
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
