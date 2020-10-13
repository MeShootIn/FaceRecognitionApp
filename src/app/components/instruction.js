import React from 'react';
import Content from './content';



/**
 * Component describing the operationы of the web application
 * 
 * @param {Content.Language} this.props.language - localization parameter
 */
class Instruction extends React.Component {
    render() {
        return (
            <div className="container text-center mt-5">
                <div className="row">
                    {/* First step: */}
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction" id="firstStep">
                            1. {Content.instruction.titles.first[this.props.language]}
                        </h5>
                        <i className="fas fa-upload fa-lg text-muted"></i>

                        <p id='firstDesc'>
                            {Content.instruction.descriptions.first[this.props.language]}
                        </p>
                    </div>

                    {/* Second step: */}
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction" id="secondStep">
                            2. {Content.instruction.titles.second[this.props.language]}
                        </h5>
                        <i className="fas fa-atom fa-lg text-muted"></i>

                        <p id='secondDesc'>
                            {Content.instruction.descriptions.second[this.props.language]}
                        </p>
                    </div>

                    {/* Third step: */}
                    <div className="col-md-4">
                        <h5 className="text-secondary instruction" id="thirdStep">
                            3. {Content.instruction.titles.third[this.props.language]}
                        </h5>
                        <i className="far fa-grin fa-lg text-muted"></i>

                        <p id='thirdDesc'>
                            {Content.instruction.descriptions.third[this.props.language]}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instruction;