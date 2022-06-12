import React from 'react';
import classes from './AtomicComponents.module.css';
import FaceInsideAtomic from './FaceInsideAtomic';

const AtomicComponents = () => {
    return (
        <div className={classes['svg-defs']} id="svg_defs">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs id="defs">
                    <symbol id="circle">
                        <circle cx="100" cy="100" r="60" stroke-width="6" fill="none"></circle>
                    </symbol>
                    <symbol id="square">
                        <rect x="45" y="50" rx="4" width="110" height="100" stroke-width="6" fill="none"></rect>
                    </symbol>
                    <symbol id="triangle" transform="scale(0.8)">
                        <path d="M100 40 L45 155 L155 155 Z" stroke-width="6" fill="none"></path>
                    </symbol>
                    <symbol id="hexagon">
                        <path d="M40 100 L70 50 L130 50 L160 100 L130 150 L70 150 Z" stroke-width="6" fill="none"></path>
                    </symbol>
                    <symbol id="dots-one">
                        <circle cx="100" cy="100" r="10"></circle>
                    </symbol>
                    <symbol id="dots-two">
                        <circle cx="120" cy="120" r="10"></circle>
                        <circle cx="80" cy="80" r="10"></circle>
                    </symbol>
                    <symbol id="dots-three">
                        <circle cx="105" cy="77" r="10"></circle>
                        <circle cx="80" cy="104" r="10"></circle>
                        <circle cx="117" cy="112" r="10"></circle>
                    </symbol>
                    <symbol id="dots-four">
                        <circle cx="80" cy="80" r="10"></circle>
                        <circle cx="120" cy="80" r="10"></circle>
                        <circle cx="80" cy="120" r="10"></circle>
                        <circle cx="120" cy="120" r="10"></circle>
                    </symbol>
                    <symbol id="dots-five">
                        <circle cx="100" cy="70" r="10"></circle>
                        <circle cx="70" cy="95" r="10"></circle>
                        <circle cx="130" cy="95" r="10"></circle>
                        <circle cx="115" cy="125" r="10"></circle>
                        <circle cx="85" cy="125" r="10"></circle>
                    </symbol>
                    {/* <!-- NUMBERING  --> */}
                    <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Almendra+SC&amp;display=swap');

                    text {
                        font-family: "Almendra SC";
                        font-size: 60px;
                    }
                `}</style>
                    {/* <!-- value 1  --> */}
                    <symbol id="value-1">
                        <text x="15" y="45">
                            1
                        </text>
                        <text x="185" y="155" rotate="180">
                            1
                        </text>
                    </symbol>
                    {/* <!-- value 2  --> */}
                    <symbol id="value-2">
                        <text x="15" y="45">
                            2
                        </text>
                        <text x="185" y="155" rotate="180">
                            2
                        </text>
                    </symbol>
                    {/* <!-- value 3  --> */}
                    <symbol id="value-3">
                        <text x="15" y="45">
                            3
                        </text>
                        <text x="185" y="155" rotate="180">
                            3
                        </text>
                    </symbol>
                    {/* <!-- value 5  --> */}
                    <symbol id="value-5">
                        <text x="15" y="45">
                            5
                        </text>
                        <text x="185" y="155" rotate="180">
                            5
                        </text>
                    </symbol>
                    {/* <!-- value 7  --> */}
                    <symbol id="value-7">
                        <text x="15" y="45">
                            7
                        </text>
                        <text x="185" y="155" rotate="180">
                            7
                        </text>
                    </symbol>
                    {/* <!-- value 11  --> */}
                    <symbol id="value-11">
                        <text x="15" y="45">
                            1
                        </text>
                        <text x="30" y="45">
                            1
                        </text>
                        <text x="185" y="155" rotate="180">
                            1
                        </text>
                        <text x="170" y="155" rotate="180">
                            1
                        </text>
                    </symbol>
                    {/* Face declarations need to get embeded here  */}
                    <symbol id="useSymbol">
                        <use href="#dots-three" />
                    </symbol>
                    <FaceInsideAtomic />
                </defs>
            </svg>
        </div>
    )
}

export default AtomicComponents;