import React, { Fragment } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';
import WoodBackground from './components/WoodBackground'

function App() {

  return (
    // <WoodBackground>
    <MainContainer>

      <h1>
        Rapture
      </h1>
        <FaceImageDefinitions />
        <DiceContainer>
          <DieDiv dieNumber="12" />
          <DieDiv dieNumber="13" />
          <DieDiv dieNumber="4" />
          <DieDiv dieNumber="21" />
        </DiceContainer>
        <DiceContainer>
          <DieDiv dieNumber="12" />
          <DieDiv dieNumber="13" />
          <DieDiv dieNumber="4" />
          <DieDiv dieNumber="21" />
        </DiceContainer>
      </MainContainer>
    // </WoodBackground>
  );
}

export default App;