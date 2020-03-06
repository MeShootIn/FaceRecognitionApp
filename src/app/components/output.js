import React from "react";
import { Image, Col, Row, Container } from 'react-bootstrap';

import face001 from '../../resourсes/face001.jpg';
import face002 from '../../resourсes/face002.jpg';

class Output extends React.Component {
    render() {
        return (
            <Container id="output" style={{background: "#FFFFFF"}}>
                <div class="p-5 text-center">
                    <Row>
                        <Col md='2'></Col>

                        <Col md='4'>
                            <Image src={face001} thumbnail />
                        </Col>
                        <Col md='4'>
                            <Image src={face002} thumbnail />
                        </Col>
                    </Row>
                    <h1 class="p-3">Match 100%</h1>
                </div>
            </Container>
        );
    }
}

export default Output;