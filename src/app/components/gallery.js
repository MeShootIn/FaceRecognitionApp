import React from "react";
import { Image, Col, Row, Container } from 'react-bootstrap';

import face001 from '../../resourсes/face001.jpg';
import face002 from '../../resourсes/face002.jpg';
import face003 from '../../resourсes/face003.jpg';
import face004 from '../../resourсes/face004.jpg';

class Gallery extends React.Component {
    render() {
        return (
            <Container>
            <Row>
                <Col md='1'></Col>

                <Col md='2'>
                    <Image src={face001} thumbnail/>
                </Col>
                <Col md='2'>
                    <Image src={face002} thumbnail/>
                </Col>
                <Col md='2'>
                    <Image src={face003} thumbnail/>
                </Col>
                <Col md='2'>
                    <Image src={face004} thumbnail/>
                </Col>
                <Col md='2'>
                    <Image src={face001} thumbnail/>
                </Col>

                <Col md='1'></Col>
            </Row>
            </Container>
        );
    }
}

export default Gallery;
