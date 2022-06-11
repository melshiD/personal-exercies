import AtomicComponents from "./atomic_die_components";
import React from 'react';

const FaceTest = () => {
    return (
        <React.Fragment>
            <AtomicComponents />
            <svg widht="200" height="200" fill="black" viewBox="0 0 200 200">
                <use href="#dots-three" />
            </svg>
        </React.Fragment>
    );
}
export default FaceTest;