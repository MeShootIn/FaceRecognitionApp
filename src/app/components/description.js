import React from "react";
import { Container } from 'react-bootstrap';

class Description extends React.Component {
    render() {
        return (
            <Container fluid>
                <div class="mb-4 p-3 text-center">
                    <h2 style={{background: "#FFFFFF"}}><small>Upload a photo of yourself and find out
                    which Game Of Thrones character looks-like you</small>
                    </h2>
                </div>
            </Container>
        );
    }
}

export default Description;