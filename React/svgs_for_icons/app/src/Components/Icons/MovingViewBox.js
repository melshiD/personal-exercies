import React, { createRef, useEffect, useRef } from 'react';
import classes from './BouncingBallsIcon.module.css';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Power4 } from 'gsap';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

const MovingViewBox = (props) => {


    const els1 = useRef();
    const q = gsap.utils.selector(els1);
    const els2 = useRef();
    const r = gsap.utils.selector(els2);
    const tl1 = useRef();
    const tl2 = useRef();

    useEffect(() => {
        tl1.current = gsap.timeline()
            .to(q('svg'), {
                attr: { viewBox: '0 0 240 90' },
                duration: 4,
                yoyo: true,
                repeat: -1
            }, 'beginning')
            .to(q('svg'), {
                attr: { viewBox: '480 0 240 90' },
                duration: 4,
                yoyo: true,
                repeat: -1
            })
    }, []);

    useEffect(() => {
        tl2.current = gsap.timeline()
            .set(r('#masking_rect'), {
                x: -240
            })
            .to(r('#masking_rect'), {
                x: 0,
                duration: 4,
                yoyo: true,
                repeat: -1
            }, 'beginning')
            .to(r('#masking_rect'), {
                x: 480,
                duration: 4,
                yoyo: true,
                repeat: -1
            })
    }, []);

    return (
        <div ref={els1}>
            <svg className={classes['svg-container']} viewBox="-240 0 240 90" ref={els2}>
                <defs>
                    {/* the color for the gradient should be configurable by prop  */}
                    <linearGradient id="fade" >
                        <stop offset="0%" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
                        <stop offset="5%" stopColor="rgb(255, 255, 255)" stopOpacity="0" />
                        <stop offset="90%" stopColor="rgb(255, 255, 255)" stopOpacity="0" />
                        <stop offset="100%" stopColor="rgb(255, 255, 255)" stopOpacity="1" />

                    </linearGradient>

                </defs>
                <rect id="r1" x="10" y="65" width="10" height="20" rx="2" fill="black" />
                <rect id="r2" x="85" y="55" width="20" height="20" rx="2" fill="black" />
                <rect id="r3" x="170" y="45" width="30" height="20" rx="2" fill="black" />
                <rect id="masking_rect" width="240" height="90" rx="2" fill="url(#fade)" />
                {/* I really need to get this to work as a mask  */}
            </svg>
        </div>
    );
};

export default MovingViewBox;
