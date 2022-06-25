import React, { Fragment, useState } from "react";
import FaceImageDefinitions from './components/FaceImageDefinitions';
import DieDiv from './components/DiceDivs';
import {DieDiv as DieDiv2} from './components/DiceDivs2';
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
    return Math.floor(Math.random() * max)
  }

  const initialPositionState = () => {
    let positionObject = {};
    //each player must have a red die, but others are randomly assigned
    let availableDice = [...Array(20).keys()];
    for (let player = 1; player < 5; player++) {
      for (let position = 1; position < 6; position++) {
        let diceLeft = availableDice.length;
        positionObject[`pos${player}_${position}`] = { 'dieNumber': availableDice.splice(Math.floor((Math.random() * diceLeft)), 1)[0].toString(10) };
        let showing = { 'showing': `${randOf(6)}` };
        let upEdge = { 'upEdge': `0` }
        positionObject[`pos${player}_${position}`] = { ...positionObject[`pos${player}_${position}`], ...showing, ...upEdge };
        // positionObject[`pos${player}_${position}`] = {'dieNumber': availableDice.splice(Math.floor((Math.random()*diceLeft)), 1)[0].toString(10)};
      }
      //assign red die (always presented as the last 4 of the array of dice)
      positionObject[`pos${player}_6`] = { 'dieNumber': `2${player - 1}` };
      let keyVal = { 'showing': `${randOf(6)}` };
      let upEdge = { 'upEdge': `0` }
      positionObject[`pos${player}_6`] = { ...positionObject[`pos${player}_6`], ...keyVal, ...upEdge };

      // positionObject[`pos${player}_6`]['dieNumber'] = `2${player - 1}`;
    }
    console.log(positionObject);
    return positionObject;
  }

  // const testPositions = {
  //   "pos1_5": {
  //     "dieNumber": "13",
  //     "showing": "4",
  //     "upEdge": "0"
  //   },
  //   "pos1_4": {
  //     "dieNumber": "0",
  //     "showing": "2",
  //     "upEdge": "0"
  //   },
  //   "pos1_3": {
  //     "dieNumber": "9",
  //     "showing": "3",
  //     "upEdge": "0"
  //   },
  //   "pos1_2": {
  //     "dieNumber": "10",
  //     "showing": "3",
  //     "upEdge": "0"
  //   },
  //   "pos1_1": {
  //     "dieNumber": "7",
  //     "showing": "4",
  //     "upEdge": "0"
  //   },
  //   "pos1_6": {
  //     "dieNumber": "20",
  //     "showing": "5",
  //     "upEdge": "0"
  //   }
  // }

  const [dieDoubleClicked, setDieDoubleClicked] = useState({ 'die': '', 'doubleClicked': true });
  const [clickedDie, setClickedDie] = useState('1');
  const [clickedIsOwn, setClickedIsOwn] = useState(false);
  const [dicePositions, setDicePositions] = useState(() => {
    return initialPositionState();
  });


  //Should I add dieDouleClicked to the positions array, and store most state there?

  const clickHandler = (event) => {
    let regex = new RegExp(/\d{1,2}/);
    setClickedDie((previousState) => {
      let newClickedDie = event.target.getAttribute('href').match(regex)[0];
      if (previousState === newClickedDie) {
        //same die clicked twice in a row
        setDieDoubleClicked({ 'die': previousState, 'doubleClicked': true });
        return previousState;
      }
      //if we make it here, our die was a different die from the last one clicked
      setDieDoubleClicked({ 'die': '', 'doubleClicked': false });
      //else, change dice positions with setDicePositions
      return newClickedDie;
    });
  }
  let dp = dicePositions;

  return (
    <MainContainer>
      <FaceImageDefinitions />
      <h1 className={classes.h2}>Rapture</h1>

      {thisPlayer1 === "playing" &&
        <DiceContainer>
          {/* do this instead  */}
          {/* {dp.pos1_1.dieNumber && <DieDiv {...dp.pos1_1} dieData={dp.pos1_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler}/>} */}
          {/* {dp.pos1_1.dieNumber && <DieDiv dieData={dp.pos1_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler.bind(this, )}/>} */}
          {dp.pos1_1.dieNumber && <DieDiv dieData={dp.pos1_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos1_2.dieNumber && <DieDiv dieData={dp.pos1_2} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos1_3.dieNumber && <DieDiv dieData={dp.pos1_3} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos1_4.dieNumber && <DieDiv dieData={dp.pos1_4} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos1_5.dieNumber && <DieDiv dieData={dp.pos1_5} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos1_6.dieNumber && <DieDiv dieData={dp.pos1_6} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
        </DiceContainer>
      }
      {thisPlayer2 === "playing" &&
        <DiceContainer>
          {dp.pos2_1.dieNumber && <DieDiv dieData={dp.pos2_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos2_2.dieNumber && <DieDiv dieData={dp.pos2_2} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos2_3.dieNumber && <DieDiv dieData={dp.pos2_3} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos2_4.dieNumber && <DieDiv dieData={dp.pos2_4} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos2_5.dieNumber && <DieDiv dieData={dp.pos2_5} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos2_6.dieNumber && <DieDiv dieData={dp.pos2_6} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
        </DiceContainer>
      }
      {thisPlayer3 === "playing" &&
        <DiceContainer>
          {dp.pos3_1.dieNumber && <DieDiv dieData={dp.pos3_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos3_2.dieNumber && <DieDiv dieData={dp.pos3_2} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos3_3.dieNumber && <DieDiv dieData={dp.pos3_3} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos3_4.dieNumber && <DieDiv dieData={dp.pos3_4} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos3_5.dieNumber && <DieDiv dieData={dp.pos3_5} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos3_6.dieNumber && <DieDiv dieData={dp.pos3_6} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
        </DiceContainer>
      }
      {thisPlayer4 === "playing" &&
        <DiceContainer>
          {dp.pos4_1.dieNumber && <DieDiv dieData={dp.pos4_1} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos4_2.dieNumber && <DieDiv dieData={dp.pos4_2} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos4_3.dieNumber && <DieDiv dieData={dp.pos4_3} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos4_4.dieNumber && <DieDiv dieData={dp.pos4_4} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos4_5.dieNumber && <DieDiv dieData={dp.pos4_5} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
          {dp.pos4_6.dieNumber && <DieDiv dieData={dp.pos4_6} doubleClicked={dieDoubleClicked} onMouseDown={clickHandler} />}
        </DiceContainer>
      }
      {/* <DiceContainer>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <DieDiv dieNumber="holde" onMouseDown={clickHandler}/>
          <button onClick={() => {setDicePositions(initialPositionState())}}>
            Change a die
          </button>
        </DiceContainer> */}
    </MainContainer>
  );
}
export default App;







export function AlternateApp(props) {
  const playerNames = ['bilbo', 'bingham', 'bryce', 'bradley'];

  const buildInitialState = (playerNames) => {
    const initialState = {};
    const availableDice = [...Array(24).keys()].map(index => index.toString(10));
    const players = [];
    playerNames.map((playerName, index) => {
      const thisPlayer = {};
      const playerPool = [];
      for (let i = 0; i < 6; i++) {
        let die = {
          'dieIndex': `${availableDice.splice(Math.floor((Math.random() * availableDice.length)), 1)[0]}`,
          'face': `${Math.floor(Math.random() * 6)}`,
          'edge': `${Math.floor(Math.random() * 4)}`
          //will handle the detail of the red die at a later time
        }
        playerPool.push(die);
      }
      thisPlayer['name'] = playerName;
      thisPlayer['pool'] = playerPool;
      players.push({...thisPlayer});
      // initialState[`player_${index}`] = thisPlayer;
    });
    initialState.players = [...players];
    return initialState;
  };

  const [selected, setSelected] = useState((null));
  const [state, setState] = useState(() => buildInitialState(playerNames));

  function onSelectDie(index) {
    if (selected && index) {
      //do the swap
      setSelected(null);
    } else {
      setSelected(index);
    }
  }

  return (
    <MainContainer>
      <FaceImageDefinitions />

      {/* WHEN YOU SIT BACK DOWN, ADD A MAP FOR PLAYERS, THEN PLAYERS.POOL  ...ok it already has it!  what's up?*/}
      
      {state.players.map(player => (
        //Dustin, why is this arrow function having a paren and not a '{' at the start?
        <DiceContainer>
          {player.pool.map(({ dieIndex, face }) => {
            // const isSelected = selected === index;

            return <DieDiv2 die={dieIndex}
              // selected={isSelected}
              // onSelect={onSelectDie.bind(this, isSelected ? null : index)}
              // face={face}
              // {...die}
            />;
          })}
        </DiceContainer>
      ))}
    </MainContainer>
  );
}

// {
//   "players": {
//       "0": {
//           "name": "bilbo",
//           "pool": [
//               {
//                   "dieIndex": "5",
//                   "face": "4",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "10",
//                   "face": "3",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "18",
//                   "face": "0",
//                   "edge": "1"
//               },
//               {
//                   "dieIndex": "2",
//                   "face": "2",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "7",
//                   "face": "2",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "4",
//                   "face": "3",
//                   "edge": "2"
//               }
//           ]
//       },
//       "1": {
//           "name": "bingham",
//           "pool": [
//               {
//                   "dieIndex": "9",
//                   "face": "5",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "12",
//                   "face": "2",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "14",
//                   "face": "5",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "15",
//                   "face": "3",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "1",
//                   "face": "0",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "16",
//                   "face": "4",
//                   "edge": "2"
//               }
//           ]
//       },
//       "2": {
//           "name": "bryce",
//           "pool": [
//               {
//                   "dieIndex": "6",
//                   "face": "1",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "0",
//                   "face": "4",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "11",
//                   "face": "1",
//                   "edge": "3"
//               },
//               {
//                   "dieIndex": "13",
//                   "face": "5",
//                   "edge": "3"
//               },
//               {
//                   "dieIndex": "19",
//                   "face": "2",
//                   "edge": "1"
//               },
//               {
//                   "dieIndex": "3",
//                   "face": "1",
//                   "edge": "0"
//               }
//           ]
//       },
//       "3": {
//           "name": "bradley",
//           "pool": [
//               {
//                   "dieIndex": "8",
//                   "face": "3",
//                   "edge": "1"
//               },
//               {
//                   "dieIndex": "17",
//                   "face": "5",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "undefined",
//                   "face": "0",
//                   "edge": "0"
//               },
//               {
//                   "dieIndex": "undefined",
//                   "face": "1",
//                   "edge": "2"
//               },
//               {
//                   "dieIndex": "undefined",
//                   "face": "1",
//                   "edge": "1"
//               },
//               {
//                   "dieIndex": "undefined",
//                   "face": "4",
//                   "edge": "2"
//               }
//           ]
//       }
//   }
// }
