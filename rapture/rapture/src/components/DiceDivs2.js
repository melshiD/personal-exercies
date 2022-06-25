import classes from './DiceDivs.module.css';
import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';

//in this example, props is the state.players[x].pool object
const DieDiv = (props) => {
    const faces = ['0', '1', '2', '3', '4', '5'];
    return (
        //  WHEN YOU SIT BACK DOWN, FIX THIS.. IT'S SO WRONG.  HOW DO WE ITERATE 6 TIMES INSIDE A LOOP INSIDE THE RETURN?
        props.players.map((player, index) => 
            // let faceClass = `classes.face_${index}`;
            (
                {
                    faces.map(faceNumber => 
                        (
                        <div classname={classes.die} >
                            <div classname={`${classes['die-face']}`}>
                                <svg viewBox="0 0 200 200">
                                    <use href={`#die${player.pool[index].dieIndex}_face${faceNumber}`} />
                                </svg>
                            </div>
                        </div>
                        );
                    );
                }
            );
        );
    );
};
export default DieDiv;
