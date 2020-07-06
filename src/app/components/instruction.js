import React from "react";
import Content from "./content";


class Instruction extends React.Component {
    render() {
        return (
            <div className="container text-center mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">1. {Content.firstStep()}</h5>
                        <i className="fas fa-upload fa-lg text-muted"></i>

                        <p>
                            {Content.firstStepDescription()}
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">2. {Content.secondStep()}</h5>
                        <i className="fas fa-atom fa-lg text-muted"></i>

                        <p>
                            {Content.secondStepDescription()}
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="text-secondary instruction">3. {Content.thirdStep()}</h5>
                        <i className="far fa-grin fa-lg text-muted"></i>

                        <p>
                            {Content.thirdStepDescription()}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instruction;