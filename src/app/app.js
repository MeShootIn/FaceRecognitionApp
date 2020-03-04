// **********************************************
// Imports
// **********************************************

import React from 'react';

/*
import {getLandmarks, loadModels} from './faceapi';
import FaceDraw from './facedraw';
import ImageSelector from './tool';

import face001 from './face001.jpg';
import face002 from './face002.jpg';
import face003 from './face003.jpg';
import face004 from './face004.jpg';
*/

import NameApp from './components/nameApp'
import Description from './components/description'
import Gallery from './components/gallery'
import Output from './components/output'

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
    const jsxRender = <div className="App">
      <header className="App-header">
        <NameApp />
        <Description />
        <Gallery />
        <Output />
      </header>
    </div>

    return jsxRender;
  } // end render

} // end App

export default App;
