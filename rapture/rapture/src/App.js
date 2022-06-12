import logo from './logo.svg';
import './App.css';
import React, {Fragment} from 'react';
import FaceImageDefinitions from './components/FaceImageDefinitions';

function App() {
  return (
    <Fragment>
      <h1>
        Rapture
      </h1>
      {/* <FaceDeclarations /> */}
      <FaceImageDefinitions />
      <svg viewBox="0 0 200 200" width="200" height="200">
      <use href="#die12_face3"></use>
      </svg>
      <svg viewBox="0 0 200 200" width="200" height="200">
      <use href="#die20_face3"></use>
      </svg>
    </Fragment>
  );
}

export default App;