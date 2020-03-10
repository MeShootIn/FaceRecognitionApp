import React from "react";

class Result extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-thumbnail" id="input" alt="Your file"></img>
                    </div>

                    <div className="col-md-6">
                        <img className="img-thumbnail" id="output" alt="Most similar celebrity"></img>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col">
                        <h2 id="match">Match ??? %</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;