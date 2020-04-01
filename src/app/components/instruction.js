import React from "react";
import Content from "./content";


class Instruction extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">1. {Content.upload()}</h5>
                        <i className="fas fa-upload fa-lg text-muted"></i>

                        <p>
                            {Content.uploadDescription()}
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">2. {Content.detection()}</h5>
                        <i class="fas fa-atom fa-lg text-muted"></i>

                        <p>
                            {Content.detectionDescription()}
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">3. {Content.result()}</h5>
                        <i class="far fa-grin fa-lg text-muted"></i>

                        <p>
                            {Content.resultDescription()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instruction;