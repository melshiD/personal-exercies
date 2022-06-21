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
  
  const initialPositionState = () => {
    let positionObject = {};
    //each player must have a red die, but others are randomly assigned
    let availableDice = [...Array(20).keys()];
    for(let player = 4; player > 0; player --){
      for(let position = 5; position > 0; position -- ){
        let diceLeft = availableDice.length;
        positionObject[`pos${player}_${position}`]['dieNumber'] = availableDice.splice(Math.floor((Math.random()*diceLeft)), 1)[0].toString(10);
      }
      //assign red die (always presented as the last 4 of the array of dice)
      positionObject[`pos${player}_6`]['dieNumber'] = `2${player - 1}`;
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

  console.log(clickedDie);
  return (
    <MainContainer>
        <FaceImageDefinitions />
        <h2 className={classes.h2}>Rapture</h2>
        
        {thisPlayer1 === "playing" && 
          <DiceContainer>
            {dicePositions.pos1_1.dieNumber && <DieDiv dieNumber={dicePositions.pos1_1.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos1_2.dieNumber && <DieDiv dieNumber={dicePositions.pos1_2.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos1_3.dieNumber && <DieDiv dieNumber={dicePositions.pos1_3.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos1_4.dieNumber && <DieDiv dieNumber={dicePositions.pos1_4.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos1_5.dieNumber && <DieDiv dieNumber={dicePositions.pos1_5.dieNumber} onMouseDown={clickHandler}/>}
            {dicePositions.pos1_6.dieNumber && <DieDiv dieNumber={dicePositions.pos1_6.dieNumber} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer2 === "playing" && 
          <DiceContainer player="player2">
            {dicePositions.pos2_1 && <DieDiv dieNumber={dicePositions.pos2_1} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_2 && <DieDiv dieNumber={dicePositions.pos2_2} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_3 && <DieDiv dieNumber={dicePositions.pos2_3} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_4 && <DieDiv dieNumber={dicePositions.pos2_4} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_5 && <DieDiv dieNumber={dicePositions.pos2_5} onMouseDown={clickHandler}/>}
            {dicePositions.pos2_6 && <DieDiv dieNumber={dicePositions.pos2_6} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer3 === "playing" && 
          <DiceContainer player="player2">
            {dicePositions.pos3_1 && <DieDiv dieNumber={dicePositions.pos3_1} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_2 && <DieDiv dieNumber={dicePositions.pos3_2} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_3 && <DieDiv dieNumber={dicePositions.pos3_3} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_4 && <DieDiv dieNumber={dicePositions.pos3_4} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_5 && <DieDiv dieNumber={dicePositions.pos3_5} onMouseDown={clickHandler}/>}
            {dicePositions.pos3_6 && <DieDiv dieNumber={dicePositions.pos3_6} onMouseDown={clickHandler}/>}
          </DiceContainer>
        }
        {thisPlayer4 === "playing" && 
          <DiceContainer>
            {dicePositions.pos4_1 && <DieDiv dieNumber={dicePositions.pos4_1} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_2 && <DieDiv dieNumber={dicePositions.pos4_2} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_3 && <DieDiv dieNumber={dicePositions.pos4_3} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_4 && <DieDiv dieNumber={dicePositions.pos4_4} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_5 && <DieDiv dieNumber={dicePositions.pos4_5} onMouseDown={clickHandler}/>}
            {dicePositions.pos4_6 && <DieDiv dieNumber={dicePositions.pos4_6} onMouseDown={clickHandler}/>}
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