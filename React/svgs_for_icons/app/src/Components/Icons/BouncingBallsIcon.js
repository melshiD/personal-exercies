import React from 'react';
import classes from './BouncingBallsIcon.module.css';


const BouncingBallsIcon = (props) => {
    return(
        <svg className={classes['svg-container']}>
            <rect x="50" y="50" width="1000" height="1000" fill="black" />
        </svg>
    )
};

export default BouncingBallsIcon;