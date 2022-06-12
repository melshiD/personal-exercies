import FaceImageDefinitions from "./FaceImageDefinitions";
import React from 'react';

const FaceDeclarations = () => {
    return (
        <React.Fragment>
            <FaceImageDefinitions />
            <svg width="200" height="200" viewBox="0 0 200 200">
                <use href="#die12_face1"></use>
            </svg>
        </React.Fragment>
    );
}
export default FaceDeclarations;