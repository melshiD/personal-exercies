import AtomicComponents from "./AtomicComponents";
import React from 'react';

const FaceDeclarations = () => {
    return (
        <React.Fragment>
            <AtomicComponents>
            </AtomicComponents>
            <svg width="200" height="200" fill="black" viewBox="0 0 200 200">
                <use href="#testRect"></use>
                <use href="#useSymbol"></use>
            </svg>
        </React.Fragment>
    );
}
export default FaceDeclarations;