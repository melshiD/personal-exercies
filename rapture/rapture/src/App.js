import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import DiceContainer from './components/DiceContainer';
import MainContainer from './components/MainContainer';
import classes from './app.module.css';

function App(props) {

  const playerIAm = 'player1';
  const thisPlayer1 = 'playing';
  const thisPlayer2 = 'playing';
  const thisPlayer3 = 'playing';
  const thisPlayer4 = 'playing';
  const randOf = (max) => {
    return Math.floor(Math.random()*max)
  }

  const initialPositionState = () => {
    let positionObject = {};
    //each player must have a red die, but others are randomly assigned
    let availableDice = [...Array(20).keys()];
    for(let player = 4; player > 0; player --){
      for(let position = 5; position > 0; position -- ){
        let diceLeft = availableDice.length;
        positionObject[`pos${player}_${position}`] = {'dieNumber': availableDice.splice(Math.floor((Math.random()*diceLeft)), 1)[0].toString(10)};
        let showing = {'showing': `${randOf(6)}`};
        let upEdge = {'upEdge': `0`}
        positionObject[`pos${player}_${position}`] = {...positionObject[`pos${player}_${position}`], ...showing, ...upEdge};
        // positionObject[`pos${player}_${position}`] = {'dieNumber': availableDice.splice(Math.floor((Math.random()*diceLeft)), 1)[0].toString(10)};
      }
      //assign red die (always presented as the last 4 of the array of dice)
      positionObject[`pos${player}_6`] = {'dieNumber': `2${player - 1}`};
      let keyVal = {'showing': `${randOf(6)}`};
      let upEdge = {'upEdge': `0`}
      positionObject[`pos${player}_6`] = {...positionObject[`pos${player}_6`], ...keyVal, ...upEdge};

      // positionObject[`pos${player}_6`]['dieNumber'] = `2${player - 1}`;
    }
    console.log(positionObject);
    return positionObject;
  }
  
  const [clickedDie, setClickedDie] = useState('1');
  const [clickedIsOwn, setClickIsOwn] = useState(false);
  const [dicePositions, setDicePositions] = useState( () => {
                                                      return initialPositionState();
                                                    });

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
  let dp = dicePositions;
  console.log(clickedDie);
  return (
    <MainContainer>
        <FaceImageDefinitions />
        <h2 className={classes.h2}>Rapture</h2>
        
        {thisPlayer1 === "playing" && 
          <DiceContainer>
            {dp.pos1_1.dieNumber && <DieDiv dieNumber={dp.pos1_1.dieNumber} showing={dp.pos1_1.showing} MouseDown={clickHandler}/>}
            {dp.pos1_2.dieNumber && <DieDiv dieNumber={dp.pos1_2.dieNumber} onMouseDown={clickHandler}/>}
            {dp.pos1_3.dieNumber && <DieDiv dieNumber={dp.pos1_3.dieNumber} onMouseDown={clickHandler}/>}
            {dp.pos1_4.dieNumber && <DieDiv dieNumber={dp.pos1_4.dieNumber} onMouseDown={clickHandler}/>}
            {dp.pos1_5.dieNumber && <DieDiv dieNumber={dp.pos1_5.dieNumber} onMouseDown={clickHandler}/>}
            {dp.pos1_6.dieNumber && <DieDiv dieNumber={dp.pos1_6.dieNumber} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer2 === "playing" && 
          <DiceContainer player="player2">
            {dicePositions.pos2_1.dieNumber && <DieDiv dieNumber={dicePositions.pos2_1.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_2.dieNumber && <DieDiv dieNumber={dicePositions.pos2_2.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_3.dieNumber && <DieDiv dieNumber={dicePositions.pos2_3.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_4.dieNumber && <DieDiv dieNumber={dicePositions.pos2_4.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_5.dieNumber && <DieDiv dieNumber={dicePositions.pos2_5.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_6.dieNumber && <DieDiv dieNumber={dicePositions.pos2_6.dieNumber} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer3 === "playing" && 
          <DiceContainer player="player2">
            {dicePositions.pos3_1.dieNumber && <DieDiv dieNumber={dicePositions.pos3_1.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_2.dieNumber && <DieDiv dieNumber={dicePositions.pos3_2.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_3.dieNumber && <DieDiv dieNumber={dicePositions.pos3_3.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_4.dieNumber && <DieDiv dieNumber={dicePositions.pos3_4.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_5.dieNumber && <DieDiv dieNumber={dicePositions.pos3_5.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_6.dieNumber && <DieDiv dieNumber={dicePositions.pos3_6.dieNumber} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer4 === "playing" && 
          <DiceContainer>
            {dicePositions.pos4_1.dieNumber && <DieDiv dieNumber={dicePositions.pos4_1.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_2.dieNumber && <DieDiv dieNumber={dicePositions.pos4_2.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_3.dieNumber && <DieDiv dieNumber={dicePositions.pos4_3.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_4.dieNumber && <DieDiv dieNumber={dicePositions.pos4_4.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_5.dieNumber && <DieDiv dieNumber={dicePositions.pos4_5.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_6.dieNumber && <DieDiv dieNumber={dicePositions.pos4_6.dieNumber} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        <DiceContainer>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <button onClick={() => {setDicePositions(initialPositionState())}}>
            Change a die
          </button>
        </DiceContainer>
      </MainContainer>
  );
}

export default App;