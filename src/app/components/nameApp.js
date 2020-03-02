import React from "react";
import { Container } from 'react-bootstrap';

class NameApp extends React.Component {
    render() {
        const styleHeader = {
            backgroundColor: "White",
        };

        return (
            <Container fluid>
                <div class="row-fuild text-center">
                    <h1 style={styleHeader}>
                        Face Recognition App
                    </h1>
                </div>
            </Container>
        );
    }
}

export default NameApp;
