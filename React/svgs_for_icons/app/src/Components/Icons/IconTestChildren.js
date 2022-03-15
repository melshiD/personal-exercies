import React, { createRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap/gsap-core';
import { Power4 } from 'gsap';

const IconTestChildren = (props) => {
    const elementsRef = useRef();
    const circsRef = gsap.utils.selector(elementsRef);
    const viewBoxAnimationRef = useRef();
    const tl = useRef();

    useEffect(() => {
        gsap.to('[id*="c"]', {
            x: 30,
            stagger: 0.13,
            repeat: -1,
            // repeatDelay: 1,
            yoyo: true,
            duration: 1,
            ease: Power4.inOut
        })
    }, []);
    const shapeFillColor = props.shapeFillColor;
    return (
        <React.Fragment >
            <circle id="c1" cx="10" cy="65" r="10" fill={shapeFillColor} />
            <circle id="c2" cx="85" cy="55" r="20" fill={shapeFillColor} />
            <circle id="c3" cx="170" cy="45" r="30" fill={shapeFillColor} />
        </React.Fragment>
    )
};

export default IconTestChildren;