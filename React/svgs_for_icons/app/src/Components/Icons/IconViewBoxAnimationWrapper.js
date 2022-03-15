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
    const initialViewBoxVals = `0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`;

    const els1 = useRef();
    const q = gsap.utils.selector(els1);
    const els2 = useRef();
    const r = gsap.utils.selector(els2);
    const tl1 = useRef();
    const tl2 = useRef();

    useEffect(() => {
        tl1.current = gsap.timeline()
            .set(q('svg'), {
                attr:{viewBox: '0 0 240 90'}
            })
            .to(q('svg'), {
                attr: { viewBox: '0 0 240 90' },
                duration: 4,
                yoyo: true,
                repeat: -1
            }, 'beginning')
            .addPause(3)
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
            })
            .addPause(3)
            .to(r('#masking_rect'), {
                x: 480,
                duration: 4,
                yoyo: true,
                repeat: -1
            })
    }, []);

    return (
        <div ref={els1}>
            <svg className={classes['svg-container']} viewBox={initialViewBoxVals} ref={els2}>
                <defs>
                    <linearGradient id="fade" >
                        <stop offset="0%" stopColor={maskStopColor} stopOpacity="1" />
                        <stop offset="5%" stopColor={maskStopColor} stopOpacity="0" />
                        <stop offset="90%" stopColor={maskStopColor} stopOpacity="0" />
                        <stop offset="100%" stopColor={maskStopColor} stopOpacity="1" />
                    </linearGradient>
                </defs>
                {props.children}
                <rect id="masking_rect" width={props.viewBoxWidth} height={props.viewBoxHeight} rx="2" fill="url(#fade)" />
            </svg>
        </div>
    );
};

export default IconViewBoxAnimationWrapper;
