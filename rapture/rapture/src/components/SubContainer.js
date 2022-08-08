import classes from "./SubContainer.module.css";

const SubContainer = (props) => {
    return(
        <div className = {classes.container} >
            {props.children}
        </div>
    )
}

export default SubContainer;