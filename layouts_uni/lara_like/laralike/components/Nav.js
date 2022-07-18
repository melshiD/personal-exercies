import classes from './Nav.module.css';
import { Fragment } from 'react';


const Nav = (props) => {
    return(
        <Fragment>
        <nav className={classes.nav}>
            <h2>Hello</h2>
        </nav>
        {props.children}
        </Fragment>

    )
};

export default Nav;