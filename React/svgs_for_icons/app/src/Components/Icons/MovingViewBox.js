import React, { createRef, useEffect, useRef } from 'react';
import classes from './BouncingBallsIcon.module.css';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Power4 } from 'gsap';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)
gsap.registerPlugin(CSSPlugin)

const MovingViewBox = (props) => {


    const el = useRef();
    const q = gsap.utils.selector(el);
    const tl = useRef();

    useEffect(() => {
        tl.current = gsap.timeline()
            .to(q('svg'), {
                viewBox: '280 0 240 90',
                duration: 4
            })
            .to(q('svg'), {
                viewBox: '0 0 240 90',
                duration: 4
            }).play();
    }, []);
//WHEN YOU SIT BACK DOWN READ AND FIGURE OUT HOW TO ANIMATE VIEWBOX IN REACT
    return (<div ref={el}>
        <svg className={classes['svg-container']} >
            <rect id="r1" x="10" y="65" width="10" height="20" rx="2" fill="black" />
            <rect id="r2" x="85" y="55" width="20" height="20" rx="2" fill="black" />
            <rect id="r3" x="170" y="45" width="30" height="20" rx="2" fill="black" />
            <rect id="r3" x="170" y="45" width="30" height="20" rx="2" fill="black" />
        </svg>
    </div>
    )
};

export default MovingViewBox;