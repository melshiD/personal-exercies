import React, { createRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap/gsap-core';
import { Power4 } from 'gsap';

const IconTestChildren = (props) => {

    useEffect(() => {
        gsap.to('[id*="circ"]', {
            x: 30,
            stagger: 0.13,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: Power4.inOut,
            duration: 0.5
        })
    }, []);

    const shapeFillColor = props.shapeFillColor;

    return (
        <React.Fragment >
            <circle id="circ1" cx="10" cy="65" r="10" fill={shapeFillColor} />
            <circle id="circ2" cx="85" cy="55" r="20" fill={shapeFillColor} />
            <circle id="circ3" cx="170" cy="45" r="30" fill={shapeFillColor} />
        </React.Fragment>
    )
};

export default IconTestChildren;