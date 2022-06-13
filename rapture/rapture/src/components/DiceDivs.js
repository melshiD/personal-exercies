import classes from './DiceDivs.module.css';

const DieDiv = (props) => {
    return(
            <div className={classes.die}>
                <div className={`${classes['die-face']} ${classes.face0}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face0`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face1}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face1`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face2}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face2`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face3}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face3`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face4}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face4`} />
                    </svg>
                </div>
                <div className={`${classes['die-face']} ${classes.face5}`}>
                    <svg viewBox="0 0 200 200">
                        <use href={`#die${props.dieNumber}_face5`} />
                    </svg>
                </div>
            </div>
    )
}

export default DieDiv;