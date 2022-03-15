import React, { createRef, useEffect, useRef } from 'react';
import classes from './BouncingBallsIcon.module.css';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Power4 } from 'gsap';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);

const IconViewBoxAnimationWrapper = (props) => {
    //config the opacity 'mask'
    const maskStopColor = props.maskStopColor;
    const initialViewBoxVals = `300 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`;

    const els1 = useRef();
    const q = gsap.utils.selector(els1);
    const els2 = useRef();
    const r = gsap.utils.selector(els2);
    const tl1 = useRef();
    const tl2 = useRef();

    const duration = 10;
    const pauseDuration = (duration-(duration/10));

    useEffect(() => {
        tl1.current = gsap.timeline({repeat:-1})
            .set(q('svg'), {
                attr: { viewBox: initialViewBoxVals }
            })
            .to(q('svg'), {
                attr: { viewBox: '0 0 240 90' },

            })
            .pause(pauseDuration)
            .to(q('svg'), {
                attr: { viewBox: '-480 0 240 90' },
            }).duration(duration).play();
    }, []);

    useEffect(() => {
        tl2.current = gsap.timeline({repeat:-1})
            .set(r('#masking_rect'), {
                x: 300,
                y: 0
            })
            .to(r('#masking_rect'), {
                x: 0,
            })
            .pause(pauseDuration)
            .to(r('#masking_rect'), {
                x: -480,
            }).duration(duration).play();
    }, []);
    //HOW DO I MAKE THE ICON'S CONSTITUENT SHAPES POSITION RELATIVE TO THE MASKING RECT
    return (
        <div ref={els1}>
            <svg className={classes['svg-container']} ref={els2} width={props.viewBoxWidth} height={props.viewBoxHeight}>
                <defs >
                    <linearGradient id="fade" >
                        <stop offset="0%" stopColor={maskStopColor} stopOpacity="1" />
                        <stop offset="5%" stopColor={maskStopColor} stopOpacity="0" />
                        <stop offset="90%" stopColor={maskStopColor} stopOpacity="0" />
                        <stop offset="100%" stopColor={maskStopColor} stopOpacity="1" />
                    </linearGradient>
                </defs>
                <g id="icon_shapes" >
                    {props.children}
                </g>
                <rect id="masking_rect" width={props.viewBoxWidth} height={props.viewBoxHeight} fill="url(#fade)"/>

            </svg>
        </div>
    );
};

export default IconViewBoxAnimationWrapper;
