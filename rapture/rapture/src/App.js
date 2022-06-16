import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';

function App() {

  const [clickedDie, setClickedDie] = useState();

  const clickHandler = (event) => {
    setClickedDie(event.target);
    console.log(clickedDie);
  }

  return (
    <MainContainer>

      <h1>
        Rapture
      </h1>
        <FaceImageDefinitions />
        <DiceContainer>
          <DieDiv dieNumber="12" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="13" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="4" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="21" onMouseDown={clickHandler}/>
        </DiceContainer>
        <DiceContainer>
          <DieDiv dieNumber="1" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="3" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="14" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="20" onMouseDown={clickHandler}/>
        </DiceContainer>
      </MainContainer>
  );
}

export default App;