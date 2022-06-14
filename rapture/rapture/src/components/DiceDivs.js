import classes from './DiceDivs.module.css';
import React, { useEffect, useRef } from "react";
import {gsap} from 'gsap';
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const DieDiv = (props) => {

    const dragInstance = useRef(null);
    const dragTarget = useRef(null);
  
    useEffect(() => {
      dragInstance.current = Draggable.create(dragTarget.current, {
        type: "x,y",
        onDragEnd(){
            let cTarg = dragTarget.current;
            console.log(cTarg.getBoundingClientRect())
            gsap.set(dragTarget.current, {x: 0, y: 0});

        }
      })
    })
  
  
    return(
            <div className={classes.die} ref={dragTarget}>
                <div className={`${classes['die-face']} ${classes.face0}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face0`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face1}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face1`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face2}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face2`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face3}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face3`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face4}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face4`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face5}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face5`} />
                    </svg>
                </div>
            </div>
    )
}

export default DieDiv;