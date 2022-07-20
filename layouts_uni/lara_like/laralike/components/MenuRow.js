import classes from './MenuRow.module.css';

const MenuRow = () => {
    return(
        <div className={classes['menu-row-container']}>
            <div className={classes['list-container']}>
                <ul className={classes.list}>
                    <li>About</li>
                    <li>Administration</li>
                    <li>Academics</li>
                    <li>Research</li>
                    <li>Career Prep</li>
                    <li>Student Experience</li>
                    <li>People</li>
                    <li>News & events</li>
                </ul>
            </div>
        </div>
    )
}

export default MenuRow;