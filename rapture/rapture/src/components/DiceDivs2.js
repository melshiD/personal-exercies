import classes from './DiceDivs.module.css';
import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';

//in this example, props is the state.players[x].pool object
export const DieDiv = (props) => {
    console.log('inside DieDiv2');
    const faces = ['0', '1', '2', '3', '4', '5'];
    return (
        <div className={classes.die} >
        {faces.map((faceNumber) => (
                <div classname={`${classes['die-face']}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.die}_face${faceNumber}`} />
                    </svg>
                </div>
            )
        )}
        </div>
    )
}
