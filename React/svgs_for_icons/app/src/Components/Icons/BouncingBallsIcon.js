import React from 'react';
import classes from './BouncingBallsIcon.module.css';


const BouncingBallsIcon = (props) => {
    return(
        <svg className={classes['svg-container']} viewBox='0 0 200 75'>
            <rect x="0" y="0" width="20" height="20" fill="black" />
        </svg>
    )
};

export default BouncingBallsIcon;