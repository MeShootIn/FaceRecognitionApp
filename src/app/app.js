// **********************************************
// Imports
// **********************************************

import React from 'react';

/*
import {getLandmarks, loadModels} from './faceapi';
import FaceDraw from './facedraw';
import ImageSelector from './tool';
*/

import Navbar from './components/navbar';
import Description from './components/description';
import Gallery from './components/gallery';
import Upload from './components/upload';
import Output from './components/output';

// **********************************************
// Const
// **********************************************

// **********************************************
// Vars
// **********************************************

// **********************************************
// class App
// **********************************************


class App extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.m_mount = null;
    this.onButton = this.onButton.bind(this);

    // animation
    this.state = {
      waitY:    WAIT_Y_MIN,
      waitStep: +WAIT_STEP,
      canvas:   null,
      imageSrc: null,
      fullDesc: null,
      idTimer: null,
    };
  } // end constr

  */

  // *********************************************
  // Write all components to jsxRender
  render() {
    

    return (
      <div>
        <Navbar />
        <Description />
        <Gallery />
        <Upload />
        <Output />
      </div>
    );
  } // end render

} // end App

export default App;
