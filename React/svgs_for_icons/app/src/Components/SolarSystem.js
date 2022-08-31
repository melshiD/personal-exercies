import React from 'react';
import classes from './SolarSystem.module.css';
import Star from './Star.js';

const SolarSystem = () => {
    //here goes all the markup for one whole solarSystem


    return(
        <React.Fragment>
        
        <svg viewBox="0 0 1000 1000">
            <Star></Star>
        </svg>
        </React.Fragment>
    );
};

export default SolarSystem;