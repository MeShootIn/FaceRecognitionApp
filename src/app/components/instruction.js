import React from "react";
import Content from "./content";


export default function Instruction(props) {
    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h5 className="text-secondary instruction" id="firstStep">1. {Content.instruction.titles.first[props.language]}</h5>
                    <i className="fas fa-upload fa-lg text-muted"></i>

                    <p id='firstDesc'>
                        {Content.instruction.descriptions.first[props.language]}
                    </p>
                </div>

                <div className="col-md-4">
                    <h5 className="text-secondary instruction" id="secondStep">2. {Content.instruction.titles.second[props.language]}</h5>
                    <i className="fas fa-atom fa-lg text-muted"></i>

                    <p id='secondDesc'>
                        {Content.instruction.descriptions.second[props.language]}
                    </p>
                </div>

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