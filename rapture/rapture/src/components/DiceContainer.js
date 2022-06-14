import classes from './DiceContainer.module.css';

function DiceContainer(props) {
    return (<div className={classes['dice-container']}>
        {props.children}
    </div>
    )
}

export default DiceContainer;