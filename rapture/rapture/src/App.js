import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';

function App() {

  const thisPlayer1 = 'player1';
  
  const [clickedDie, setClickedDie] = useState('1');
  const [clickedIsOwn, setClickIsOwn] = useState(false);
  const [dicePositions, setDicePositions] = useState({
    pos1: "12", pos2: "11", pos3: "14", pos4: "13"
  });


  //DONT EVEN NEED TO FIND A BINDING!  JUST USE THE POSITIONS FROM THE STATE OBJECT AGAINST WHO HAS WHAT AT A PARTICULAR TIME
  const clickedIsOwnHandler = (event) => {
    if(event.target.getAttribute('data-player') == thisPlayer1){
      console.log('you are my own die');
      return true;
    }
    console.log(event.target);
    return false;
  }

  const clickHandler = (event) => {
    let regex = new RegExp(/\d{1,2}/);
    setClickedDie((previousState) => {
      let newClickedDie = event.target.getAttribute('href').match(regex)[0];
      if(previousState === newClickedDie){
        console.log('clicked same dice twice');
        return previousState;
      }
      //else, change dice positions with setDicePositions

      return newClickedDie;
    });
  }
  //in the game, switch positions in this context only applies if one's own dice are clicked first
  // setDicePositions( (event) => {
  //   let event.target.getAttribute('href').match(regex)[0]);
  // }
  console.log(clickedDie);
  return (
    <MainContainer>
        <FaceImageDefinitions />
        <DiceContainer>
          <DieDiv dieNumber={dicePositions.pos1} onMouseDown={clickHandler}/>
          <DieDiv dieNumber={dicePositions.pos2} onMouseDown={clickHandler}/>
          <DieDiv dieNumber={dicePositions.pos3} onMouseDown={clickHandler}/>
          {dicePositions.pos4 && <DieDiv dieNumber={dicePositions.pos4} onMouseDown={clickHandler}/>}
        </DiceContainer>
        <DiceContainer player="player2">
          <DieDiv dieNumber="1" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="3" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="14" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="20" onMouseDown={clickHandler}/>
        </DiceContainer>
        <DiceContainer onClick={clickedIsOwnHandler} player={thisPlayer1}>
          <DieDiv dieNumber="15" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="7" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="2" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="8" onMouseDown={clickHandler}/>
        </DiceContainer>
      </MainContainer>
  );
}

export default App;