import React from "react";
import Content from "./content";


class Result extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-thumbnail" id="input" alt={Content.yourFace()}></img>
                    </div>

                    <div className="col-md-6">
                        <img className="img-thumbnail" id="output" alt={Content.celebrityFace()}></img>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col">
                        <h2 id="match">{Content.match()} ??? %</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;