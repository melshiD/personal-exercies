import { Fragment } from 'react';
import classes from './DiceContainer.module.css';

function DiceContainer(props) {
    return (
        <Fragment>
            <div className={classes['player-title']}>Player #</div>
            <div className={classes['dice-container']}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default DiceContainer;