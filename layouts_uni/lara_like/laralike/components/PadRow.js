//takes props for main title and show-large title addition
import classes from './PadRow.module.css';

const PadRow = (props) => {
    // let mainTitle = props.mainTitle;
    // let superTitle = props.showLargeTitle;

    return(
        <div className={`${classes.pad}, ${classes.row}`}> 
            <p className={`${classes['show-for-large']}, ${classes['small-caps']}`}>
                The College of Public Health
            </p>
            <h1 className={classes.title}>
                <a className={classes.titleLink} href="*">Prevention Insights</a>
            </h1>
        </div>
    )
}

export default PadRow;