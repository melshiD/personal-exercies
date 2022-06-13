import React, {Fragment} from 'react';
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import classes from './components/DiceContainer.module.css';

function App() {
  return (
    <div className={classes['body-container']}>
    <Fragment>
      <h1>
        Rapture
      </h1>
      <FaceImageDefinitions />
      <div className={classes['dice-container']}>
      <DieDiv dieNumber="20"/>
      <DieDiv dieNumber="13"/>
      <DieDiv dieNumber="4"/>
      <DieDiv dieNumber="8"/>
      </div>
    </Fragment>
    </div>
  );
}

export default App;