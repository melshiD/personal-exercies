import React, { createRef, useEffect } from 'react';
import classes from './BouncingBallsIcon.module.css';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Power4 } from 'gsap';


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const BouncingBallsIcon = (props) => {
    const elementsRef = createRef();
    const circsRef = gsap.utils.selector(elementsRef);
    const viewBoxAnimationRef = createRef();


    useEffect( () => {
        gsap.to(viewBoxAnimationRef.current, {
            viewBox: "240 0 240 90",
            duration: 4
        });
    });

    useEffect( ()=> {
        gsap.to(circsRef("circle"), {
            x: 30,
            stagger: 0.13,
            repeat: -1,
            // repeatDelay: 1,
            yoyo: true,
            duration: 1,
            ease: Power4.inOut
        }) 
    }, []);

    return(
        <svg className={classes['svg-container']} viewBox='0 0 240 90' ref={elementsRef}>
            <circle id="c1" cx="10" cy="65" r="10" fill="black" />
            <circle id="c2" cx="85" cy="55" r="20" fill="black" />
            <circle id="c3" cx="170" cy="45" r="30" fill="black" />
        </svg>
    )
};

export default BouncingBallsIcon;


//WHEN YOU SIT BACK DOWN, CONFIGURE A SHAPES ICON COMPONENT THAT CAN TAKE
//PROPS FOR NUMBER OF ITEMS, SHAPE, ORDER, ANIMATION AND ANY OTHER INTERACTION