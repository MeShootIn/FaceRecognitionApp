import React from "react";
import { Container, Jumbotron } from 'react-bootstrap';

class NameApp extends React.Component {
    render() {
        return (
            <Jumbotron fluid className="bg-info text-white">
                <Container>
                    <h1 class="display-1">
                        SeriesFace
                    </h1>
                </Container>
            </Jumbotron>
        );
    }
}

export default NameApp;
