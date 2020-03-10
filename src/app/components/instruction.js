import React from "react";

class Instruction extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">1. Upload a photo</h5>
                        <i className="fas fa-upload fa-lg text-muted"></i>

                        <p>
                            There should be only one person in the photo. Face recognition accuracy depends on the resolution
                            and quality of a face image.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">2. The system detects the face</h5>
                        <i class="fas fa-atom fa-lg text-muted"></i>

                        <p>
                            The system detects the face and creates a facial pattern. It can locate the key components of
                            faces, including eyebrows, eyes, nose, mouth and position.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">3. Enjoy the result!</h5>
                        <i class="far fa-grin fa-lg text-muted"></i>

                        <p>
                            The Neural Network compares the person with celebrity faces and suggests the most similar one.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instruction;