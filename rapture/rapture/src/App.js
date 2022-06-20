import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';

function App() {

  const thisPlayer1 = 'player1';
  
  const initialPositionState = (numberOfPlayers) => {
    let positionObject = {};
    //each player must have a red die, but others are randomly assigned
    //for our prototype example we already know what will be red, but here
    //we will just assume die 18, 19, 20 and 21
    let availableDice = [...Array(numberOfPlayers*5).keys()].map(num=>num+1);
    for(let player = numberOfPlayers; player > 0; player --){
      for(let position = 5; position > 0; position -- ){
        let diceLeft = availableDice.length;
        positionObject[`pos${player}_${position}`] = availableDice.splice(Math.random()*diceLeft, 1)[0];
      }
    }
    console.log(positionObject);
    return positionObject;
  }
  // initialPositionState(3);
  const [clickedDie, setClickedDie] = useState('1');
  const [clickedIsOwn, setClickIsOwn] = useState(false);
  const [dicePositions, setDicePositions] = useState(initialPositionState(4));
  // const [dicePositions, setDicePositions] = useState({
  //   //position object may be produced at time of bag parsing and passed to this as state
  //   pos1_1: "12", pos1_2: "11", pos1_3: "14", pos1_4: "13", pos1_5: '15', pos1_6: '3',
  //   pos2_1: "12", pos2_2: "11", pos2_3: "14", pos2_4: "13", pos2_5: '6', pos2_6: '5',
  //   pos3_1: "12", pos3_2: "11", pos3_3: "14", pos3_4: "13", pos3_5: '22', pos3_6: '21',
  //   pos4_1: "12", pos4_2: "11", pos4_3: "14", pos4_4: "13", pos4_5: '18', pos4_6: '5',
  // });


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
        <h2>Rapture</h2>
        <DiceContainer>
          {dicePositions.pos1_1 && <DieDiv dieNumber={dicePositions.pos1_1} onMouseDown={clickHandler}/>}
          {dicePositions.pos1_2 && <DieDiv dieNumber={dicePositions.pos1_2} onMouseDown={clickHandler}/>}
          {dicePositions.pos1_3 && <DieDiv dieNumber={dicePositions.pos1_3} onMouseDown={clickHandler}/>}
          {dicePositions.pos1_4 && <DieDiv dieNumber={dicePositions.pos1_4} onMouseDown={clickHandler}/>}
          {dicePositions.pos1_5 && <DieDiv dieNumber={dicePositions.pos1_5} onMouseDown={clickHandler}/>}
          {dicePositions.pos1_6 && <DieDiv dieNumber={dicePositions.pos1_6} onMouseDown={clickHandler}/>}
        </DiceContainer>
        <DiceContainer player="player2">
          {dicePositions.pos2_1 && <DieDiv dieNumber={dicePositions.pos2_1} onMouseDown={clickHandler}/>}
          {dicePositions.pos2_2 && <DieDiv dieNumber={dicePositions.pos2_2} onMouseDown={clickHandler}/>}
          {dicePositions.pos2_3 && <DieDiv dieNumber={dicePositions.pos2_3} onMouseDown={clickHandler}/>}
          {dicePositions.pos2_4 && <DieDiv dieNumber={dicePositions.pos2_4} onMouseDown={clickHandler}/>}
          {dicePositions.pos2_5 && <DieDiv dieNumber={dicePositions.pos2_5} onMouseDown={clickHandler}/>}
          {dicePositions.pos2_6 && <DieDiv dieNumber={dicePositions.pos2_6} onMouseDown={clickHandler}/>}
        </DiceContainer>
        <DiceContainer player="player2">
          {dicePositions.pos3_1 && <DieDiv dieNumber={dicePositions.pos3_1} onMouseDown={clickHandler}/>}
          {dicePositions.pos3_2 && <DieDiv dieNumber={dicePositions.pos3_2} onMouseDown={clickHandler}/>}
          {dicePositions.pos3_3 && <DieDiv dieNumber={dicePositions.pos3_3} onMouseDown={clickHandler}/>}
          {dicePositions.pos3_4 && <DieDiv dieNumber={dicePositions.pos3_4} onMouseDown={clickHandler}/>}
          {dicePositions.pos3_5 && <DieDiv dieNumber={dicePositions.pos3_5} onMouseDown={clickHandler}/>}
          {dicePositions.pos3_6 && <DieDiv dieNumber={dicePositions.pos3_6} onMouseDown={clickHandler}/>}
        </DiceContainer>
        <DiceContainer onClick={clickedIsOwnHandler} player={thisPlayer1}>
          {dicePositions.pos4_1 && <DieDiv dieNumber={dicePositions.pos4_1} onMouseDown={clickHandler}/>}
          {dicePositions.pos4_2 && <DieDiv dieNumber={dicePositions.pos4_2} onMouseDown={clickHandler}/>}
          {dicePositions.pos4_3 && <DieDiv dieNumber={dicePositions.pos4_3} onMouseDown={clickHandler}/>}
          {dicePositions.pos4_4 && <DieDiv dieNumber={dicePositions.pos4_4} onMouseDown={clickHandler}/>}
          {dicePositions.pos4_5 && <DieDiv dieNumber={dicePositions.pos4_5} onMouseDown={clickHandler}/>}
          {dicePositions.pos4_6 && <DieDiv dieNumber={dicePositions.pos4_6} onMouseDown={clickHandler}/>}
        </DiceContainer>
        <DiceContainer onClick={clickedIsOwnHandler} player={thisPlayer1}>
          <DieDiv dieNumber="3" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="4" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="5" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="18" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="18" onMouseDown={clickHandler}/>
        </DiceContainer>
      </MainContainer>
  );
}

export default App;