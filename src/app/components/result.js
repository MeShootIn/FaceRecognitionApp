import React from "react";
import Content from "./content";

import face001 from "../../resourсes/face001.jpg";


class Result extends React.Component {
    // componentDidMount() {
    //     this.updateCanvas();
    // }

    // componentDidUpdate() {
    //     this.updateCanvas();
    // }

    // updateCanvas() {
    //     let canvas = this.refs.input;
    //     let ctx = canvas.getContext("2d");

    //     if(!ctx) {
    //         return;
    //     }

    //     let img = new Image();
    //     img.src = face001;

    //     img.onload = function () {
    //         ctx.drawImage(img, 0, 0);
    //     }
    // }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <canvas ref="input">
                            <p>
                                {Content.errorCanvas()}
                            </p>
                        </canvas>

                        <img className="img-thumbnail" id="input" alt={Content.yourFace()} hidden></img>
                    </div>

                    <div className="col-md-6">
                        <canvas ref="output">
                            <p>
                                {Content.errorCanvas()}
                            </p>
                        </canvas>
                        
                        <img className="img-thumbnail" id="output" alt={Content.celebrityFace()} hidden></img>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div id="progress" className="progress">
                            <div id="match" className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <h4 id="percent">&nbsp;</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;