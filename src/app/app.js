// **********************************************
// Imports
// **********************************************

import React from 'react';
//import ReactDOM from 'react-dom';
/*
import {getLandmarks, loadModels} from './faceapi';
import FaceDraw from './facedraw';
import ImageSelector from './tool';

import face001 from './face001.jpg';
import face002 from './face002.jpg';
import face003 from './face003.jpg';
import face004 from './face004.jpg';
*/
// **********************************************
// Const
// **********************************************

/*
const WAIT_Y_MIN = 60;
const WAIT_Y_MAX = 80;
const WAIT_STEP = 2;
*/

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

  // *********************************************
  onTimer() {
    // console.log('on timer...');
    if (this.state.fullDesc != null) {
      clearInterval(this.state.idTimer);
      this.setState({idTimer: null});

      const faceDraw = new FaceDraw();
      faceDraw.drawLandmarks(this.state);

      return;
    }

    const objCanvas = this.state.canvas;
    const ctx = objCanvas.getContext('2d');

    //const imageSrc = this.refs.face001;
    const imageSrc = this.state.imageSrc;
    
    const wImage = imageSrc.width;
    const hImage = imageSrc.height;

    ctx.drawImage(imageSrc, 0, 0, wImage, hImage, 0, 0, wImage, hImage);

    ctx.font = "48px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    let y = this.state.waitY;
    ctx.fillText("Wait face detection ...", objCanvas.width / 2, y); 
    y += this.state.waitStep;
    if (y >= WAIT_Y_MAX)
    {
      y = WAIT_Y_MAX;
      this.setState({waitStep: -WAIT_STEP});
    }
    if (y <= WAIT_Y_MIN)
    {
      y = WAIT_Y_MIN;
      this.setState({waitStep: +WAIT_STEP});
    }
    this.setState({waitY: y});
  }

  // *********************************************
  renderSceneLoaded(imageSrc) {
    const wImage = imageSrc.width;
    const hImage = imageSrc.height;
    console.log("image dim = " + wImage.toString() + ", " + hImage.toString());

    this.setState({imageSrc: imageSrc});

    const objCanvas = this.refs.canvas;
    if (objCanvas === null) {
      return;
    }
    this.setState({canvas: objCanvas});
    objCanvas.width = wImage;
    objCanvas.height = hImage;

    const ctx = objCanvas.getContext('2d');

    ctx.fillStyle = 'rgb(64, 64, 64)';
    //ctx.fillRect(0,0, wImage, hImage);

    // draw source image on screen
    ctx.drawImage(imageSrc, 0, 0, wImage, hImage, 0, 0, wImage, hImage);

    // perform animtaion by timer
    const idTimerNew = setInterval(this.onTimer.bind(this), 50);
    this.setState({idTimer: idTimerNew});
  }

  renderScene(faceRef) {
    const imageSrc = faceRef;

    imageSrc.onload = () => {
      this.renderSceneLoaded(imageSrc);
    } // end on load image
  } // end renderScene

  // *********************************************
  async componentDidMount() {
    this.renderScene(this.refs.face001);

    await loadModels();
    await this.processImage(this.state.imageSrc);
  }

  processImage = async(imageSrc) => {
    await getLandmarks(imageSrc).then( fullDescription => {
      // console.log(fullDescription);
      this.setState({fullDesc: fullDescription});
    });
  };

  async startDetect(index) {
    const refs = [this.refs.face001, this.refs.face002, this.refs.face003, this.refs.face004];
    const imgRef = refs[index];
    this.setState({fullDesc: null});
    this.renderSceneLoaded(imgRef);
    // await this.processImage(this.state.imageSrc);
    await this.processImage(imgRef);
  }

  onButton(index) {
    console.log('Pressed button :' + index.toString());
    //const imgArr = [face001, face002, face003, face004];
    //const imgSelected = imgArr[index];
    //this.setState({imagSrc: imgSelected});
    this.startDetect(index);
  }
  */

  // *********************************************
  // Write all components to jsxRender
  render() {
    const jsxRender = <div className="App">
      <header className="App-header">

      </header>
    </div>

    return jsxRender;
  } // end render

  /*
  oldRender() {
    const styleImage = {
      display: 'none'
    };
    const strMessage = (this.state.fullDesc !== null) ? 'Face landmarks are detected!' : 'Wait for detect face ...';

    const jsxCanvas = <canvas ref="canvas" />
    const jsxRender =     <div className="App">
      <header className="App-header">
        
        <img src={face001} alt="face" style={styleImage} ref="face001" />
        <img src={face002} alt="face" style={styleImage} ref="face002" />
        <img src={face003} alt="face" style={styleImage} ref="face003" />
        <img src={face004} alt="face" style={styleImage} ref="face004" />

        <ImageSelector func={this.onButton}/>
        
        <p>
          {strMessage}
        </p>
        {jsxCanvas}
      </header>
    </div>

    return jsxRender;
  } // end render
  */

} // end App

export default App;
