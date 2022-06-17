import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';

function App() {

  let pos1, pos2 = '';

  const [clickedDie, setClickedDie] = useState({
    pos1: "12", pos2: "11", pos3: "14", pos4: "13"
  });

  const clickHandler = (event) => {
    let regex = new RegExp(/\d{1,2}/);
    // setClickedDie(() => {
    //   return event.target.getAttribute('href').match(regex)[0];
    // });
    setClickedDie(event.target.getAttribute('href').match(regex)[0]);
    // console.log(clickedDie);
  }
  console.log(clickedDie);
  return (
    <MainContainer>

      <h1>
        Rapture
      </h1>
        <FaceImageDefinitions />
        <DiceContainer>
          <DieDiv dieNumber={clickedDie.pos1} onMouseDown={clickHandler}/>
          <DieDiv dieNumber={clickedDie.pos2} onMouseDown={clickHandler}/>
          <DieDiv dieNumber={clickedDie.pos3} onMouseDown={clickHandler}/>

          {/* WHEN YOU SIT BACK DOWN, USE THE RETURN FUNCTION TO SPREAD/UPDATE THE FULL STATE WITH CLICKHANDLER  */}
          {/* see below... if a position isn't accounted for in state, it means the dice no longer fills that space */}
          {clickedDie.pos4 && <DieDiv dieNumber={clickedDie.pos4} onMouseDown={clickHandler}/>}
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