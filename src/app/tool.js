// ********************************************************
// Imports
// ********************************************************

import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import React from 'react';

import Face001 from './face001.jpg';
import Face002 from './face002.jpg';
import Face003 from './face003.jpg';
import Face004 from './face004.jpg';

// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************

class ImageSelector extends React.Component {

  constructor(props) {
    super(props);
    this.m_func = null;
    this.onButton1 = this.onButton1.bind(this);
    this.onButton2 = this.onButton2.bind(this);
    this.onButton3 = this.onButton3.bind(this);
    this.onButton4 = this.onButton4.bind(this);
    // this.state = { func: null, };
  }
  onButton1() {    this.m_func(0);  }
  onButton2() {    this.m_func(1);  }
  onButton3() {    this.m_func(2);  }
  onButton4() {    this.m_func(3);  }

  render() {
    const funcParam = this.props.func;
    this.m_func = funcParam;

    const jsxRender = 
      <Container fluid >
        <h3>
          Select image to detect face
        </h3>
        <Row>

          <Col xs md lg="3">
            <Button onClick={this.onButton1} >
              <Image src={Face001} fluid />
            </Button>
          </Col>

          <Col xs md lg="3">
            <Button onClick={this.onButton2} >
              <Image src={Face002} fluid />
            </Button>
          </Col>

          <Col xs md lg="3">
            <Button onClick={this.onButton3} >
              <Image src={Face003} fluid />
            </Button>
          </Col>

          <Col xs md lg="3">
            <Button onClick={this.onButton4} >
              <Image src={Face004} fluid />
            </Button>
          </Col>

        </Row>
      </Container>;
    return jsxRender;
  }
} // end class ImageSelector

export default ImageSelector;
