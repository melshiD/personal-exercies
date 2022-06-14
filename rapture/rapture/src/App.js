import React, { Fragment } from 'react';
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <Fragment>
      <h1>
        Rapture
      </h1>
      <MainContainer>
        <FaceImageDefinitions />
        <DiceContainer>
          <DieDiv dieNumber="1" />
          <DieDiv dieNumber="13" />
          <DieDiv dieNumber="4" />
          <DieDiv dieNumber="21" />
          <DieDiv dieNumber="14" />
          <DieDiv dieNumber="2" />
        </DiceContainer>
        <DiceContainer>
          <DieDiv dieNumber="11" />
          <DieDiv dieNumber="15" />
          <DieDiv dieNumber="3" />
          <DieDiv dieNumber="3" />
          <DieDiv dieNumber="5" />
          <DieDiv dieNumber="6" />
        </DiceContainer>
        <DiceContainer>
          <DieDiv dieNumber="1" />
          <DieDiv dieNumber="13" />
          <DieDiv dieNumber="4" />
          <DieDiv dieNumber="21" />
          <DieDiv dieNumber="14" />
          <DieDiv dieNumber="2" />
        </DiceContainer>
        <DiceContainer>
          <DieDiv dieNumber="11" />
          <DieDiv dieNumber="15" />
          <DieDiv dieNumber="3" />
          <DieDiv dieNumber="3" />
          <DieDiv dieNumber="5" />
          <DieDiv dieNumber="6" />
        </DiceContainer>
      </MainContainer>
    </Fragment>
  );
}

export default App;