import { Fragment } from 'react';
import classes from './DiceContainer.module.css';

function DiceContainer(props) {
    return (
        <Fragment>
            <h3 className={classes['player-title']}>Player #</h3>
            <div className={classes['dice-container']}>
        {props.children}
    </div>
    </Fragment>
    )
}

export default DiceContainer;