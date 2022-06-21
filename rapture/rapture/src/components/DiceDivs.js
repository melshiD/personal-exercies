import classes from './DiceDivs.module.css';
import React, { useEffect, useRef } from "react";
import {gsap} from 'gsap';
// import { Draggable } from "gsap/Draggable";

// gsap.registerPlugin(Draggable);

const DieDiv = (props) => {

    const dieData = props.dieData;
    const thisDie = useRef();
    const extraMovement = (timesWhat) => {
        let returningValue = (Math.floor(Math.random()*4)+1)*timesWhat;
        console.log(returningValue);
        return returningValue;
    }

    //should this object be in the parent component?
    //It's imparative this object correspond with the transformations 
    //in CSS for the die faces to ensure the applicable properties of the faces
    //(per their svg iconography) can be tracked and the meaning applied according to the rules of the game
    const showingSide = {
        '0': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)}`},
        '1': {'y': `${extraMovement(360)+90}`, 'x': `${extraMovement(360)}`},
        '2': {'y': `${extraMovement(360)+180}`, 'x': `${extraMovement(360)}`},
        '3': {'y': `${extraMovement(360)+270}`, 'x': `${extraMovement(360)}`},
        '4': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)+90}`},
        '5': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)+270}`}
    };

    useEffect( () => {
        gsap.to(thisDie.current, {rotationY: `${showingSide[dieData.showing]['y']}`, rotationX: `${showingSide[dieData.showing]['x']}`, duration: `${extraMovement(0.5)}`});
    });
    //WHY DO THE DIE 1. ROLL EACH TIME I CLICK THEM 2. NOT ROTATE ON THE X AXIS EACH TIME AS SHOULD BE THE
    //this gsap.set is what was foiling my x-rotations, but how do I preset per this and also enable the animated version
    // gsap.set(thisDie.current, {rotateX: `${showingSide[dieData.showing]['x']}`, rotateY: '46'});

    if(props.doubleClicked.doubleClicked && (props.doubleClicked.die === props.dieNumber)){
        // console.log(props.doubleClicked);
    }
    //SET SHOWING SIDE WITH GREENSOCK SET METHOD

    //WHEN YOU SIT BACK DOWN, BUILD A GOOD WAY TO RANDOMIZE AND ANIMATE THE ROLLING OF DIE BASED ON SHOWING VALUE

    return(
            <div className={classes.die} ref={thisDie}>
            {/* <div className={classes.die} > */}
                <div className={`${classes['die-face']} ${classes.face0}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face0`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face1}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face1`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face2}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face2`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face3}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face3`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face4}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face4`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face5}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieData.dieNumber}_face5`} onMouseDown={props.onMouseDown}/>
                    </svg>
                </div>
            </div>
    )
}

export default DieDiv;



    
    
    // const dragInstance = useRef(null);
    // const dragTarget = useRef(null);
    // useEffect(() => {
    //   dragInstance.current = Draggable.create(dragTarget.current, {
    //     type: "x,y",
    //     onDragEnd(){
    //         let cTarg = dragTarget.current;
    //         console.log(cTarg.getBoundingClientRect())
    //         // gsap.set(dragTarget.current, {x: 0, y: 0});

    //     }
    //   })
    // })