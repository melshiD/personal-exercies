import classes from './DiceDivs.module.css';
import React, { useEffect, useRef } from "react";
import {gsap} from 'gsap';

const DieDiv = (props) => {

    const dieData = props.dieData;
    const thisDie = useRef();
    const extraMovement = (timesWhat) => {
        let returningValue = (Math.floor(Math.random()*4)+1)*timesWhat;
        // console.log(returningValue);
        return returningValue;
    }

    //should this object be in the parent component?
    //It's imparative this object correspond with the transformations 
    //in CSS for the die faces to ensure the applicable properties of the faces
    //(per their svg iconography) can be tracked and the meaning applied according to the rules of the game
    let extraneousDieMovement = extraMovement(360)+360;
    const showingSide = {
        '0': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)}`},
        '1': {'y': `${extraMovement(360)+90}`, 'x': `${extraMovement(360)}`},
        '2': {'y': `${extraMovement(360)+180}`, 'x': `${extraMovement(360)}`},
        '3': {'y': `${extraMovement(360)+270}`, 'x': `${extraMovement(360)}`},
        '4': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)+90}`},
        '5': {'y': `${extraMovement(360)}`, 'x': `${extraMovement(360)+270}`}
    };
    // const showingSide = {
    //     '0': {'y': `${extraneousDieMovement}`, 'x': `${extraneousDieMovement}`},
    //     '1': {'y': `${extraneousDieMovement+90}`, 'x': `${extraneousDieMovement}`},
    //     '2': {'y': `${extraneousDieMovement+180}`, 'x': `${extraneousDieMovement}`},
    //     '3': {'y': `${extraneousDieMovement+270}`, 'x': `${extraneousDieMovement}`},
    //     '4': {'y': `${extraneousDieMovement}`, 'x': `${extraneousDieMovement+90}`},
    //     '5': {'y': `${extraneousDieMovement}`, 'x': `${extraneousDieMovement+270}`}
    // };

    useEffect( () => {
        //for the first setup, before an actual roll, we can just pass a '0' to duration and use this gsap.to as a gsap.set
        gsap.to(thisDie.current, {rotationY: `${showingSide[dieData.showing]['y']}`, rotationX: `${showingSide[dieData.showing]['x']}`, duration: `${extraMovement(0.5)}`});
    }, []);

    if(props.doubleClicked.doubleClicked && (props.doubleClicked.die === props.dieNumber)){
        console.log(props.doubleClicked.doubleClicked);
    }

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



    
    // import { Draggable } from "gsap/Draggable";
    // gsap.registerPlugin(Draggable);

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