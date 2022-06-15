import classes from './WoodBackground.module.css';

const WoodBackground = (props) => {
    return(
        <div className={classes['wood-background']}>
            {props.children}
        </div>
    )
}

export default WoodBackground;