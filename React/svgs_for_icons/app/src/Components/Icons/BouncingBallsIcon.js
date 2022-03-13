import React, { createRef, useEffect, useRef } from 'react';
import classes from './BouncingBallsIcon.module.css';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin'


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const BouncingBallsIcon = (props) => {
    const rectRef = createRef();

    useEffect( ()=> {
        gsap.to(rectRef.current, {scale: '5'});
    });

    return(
        <svg className={classes['svg-container']} viewBox='0 0 200 75'>
            <rect ref={rectRef} x="30" y="20" width="30" rx='4' height="34" ></rect>
            <circle id="c1" cx="10" cy="65" r="10" fill="black" />
            <circle id="c2" cx="85" cy="55" r="20" fill="black" />
            <circle id="c3" cx="170" cy="45" r="30" fill="black" />
        </svg>
    )
};

export default BouncingBallsIcon;