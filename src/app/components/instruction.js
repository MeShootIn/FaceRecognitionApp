import React from "react";
import Content from "./content";


/**
 * Component describing the operationы of the web application
 * 
 * @param {Content.Language} props.language - localization parameter
 */
export default function Instruction(props) {
    return (
        <div className="container text-center mt-5">
            <div className="row">
                {/* First step: */}
                <div className="col-md-4">
                    <h5 className="text-secondary instruction" id="firstStep">1. {Content.instruction.titles.first[props.language]}</h5>
                    <i className="fas fa-upload fa-lg text-muted"></i>

                    <p id='firstDesc'>
                        {Content.instruction.descriptions.first[props.language]}
                    </p>
                </div>

                {/* Second step: */}
                <div className="col-md-4">
                    <h5 className="text-secondary instruction" id="secondStep">2. {Content.instruction.titles.second[props.language]}</h5>
                    <i className="fas fa-atom fa-lg text-muted"></i>

                    <p id='secondDesc'>
                        {Content.instruction.descriptions.second[props.language]}
                    </p>
                </div>

                {/* Third step: */}
                <div className="col-md-4">
                    <h5 className="text-secondary instruction" id="thirdStep">3. {Content.instruction.titles.third[props.language]}</h5>
                    <i className="far fa-grin fa-lg text-muted"></i>

                    <p id='thirdDesc'>
                        {Content.instruction.descriptions.third[props.language]}
                    </p>
                </div>
            </div>
        </div>
    );
}
