import React from "react";
import Content from "./content";


/**
 * добавить Content.celebrityName(index) {getFromJson("dataset.json", index);}
 * исправить размер canvasInput.width ...
 */

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.updateCanvas = this.updateCanvas.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            inputSrc: null,
            inputWidth: 0,
            inputHeight: 0,
            outputSrc: null,
            outputWidth: 0,
            outputHeight: 0
        };
    }

    static upload(inputSrc, outputSrc) {
        let input = document.getElementById("inputImgHidden");
        let output = document.getElementById("outputImgHidden");
        let button = document.getElementById("uploadButtonHidden");

        input.src = inputSrc;
        output.src = outputSrc;
        button.click();
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        if(!this.state.inputSrc) {
            return;
        }

        // input
        let canvasInput = this.refs.input;
        let ctxInput = canvasInput.getContext("2d");

        if (!ctxInput) {
            return;
        }

        let input = new Image();
        input.src = this.state.inputSrc;
        canvasInput.width = 600;
        canvasInput.height = 800;
        // canvasInput.width = this.state.inputWidth;
        // canvasInput.height = this.state.inputHeight;
        // ОТРИСОВКА INPUT
        input.onload = function () {
            ctxInput.drawImage(input, 0, 0);
        }

        // output
        let canvasOutput = this.refs.output;
        let ctxOutput = canvasOutput.getContext("2d");

        if (!ctxOutput) {
            return;
        }

        let output = new Image();
        output.src = this.state.outputSrc;
        canvasOutput.width = 600;
        canvasOutput.height = 800;
        // canvasOutput.width = this.state.outputWidth;
        // canvasOutput.height = this.state.outputHeight;
        // ОТРИСОВКА OUTPUT
        output.onload = function () {
            ctxOutput.drawImage(output, 0, 0);
        }
    }

    handleClick() {
        let input = document.getElementById("inputImgHidden");
        let output = document.getElementById("outputImgHidden");

        this.setState({
            inputSrc: input.src,
            inputW: input.width,
            inputH: input.height,
            outputSrc: output.src,
            outputW: output.width,
            outputH: output.height
        });
        this.updateCanvas(); // мб не нужно из-за compDidUpdate
    }
    
    render() {
        return (
            <div className="container mt-5" id="result">
                <img id="inputImgHidden" alt="inputHidden" hidden></img>
                <img id="outputImgHidden" alt="outputHidden" hidden></img>
                <button id="uploadButtonHidden" onClick={this.handleClick} hidden></button>

                <div className="row pt-3">
                    <div className="col-md-6">
                        <canvas ref="input">
                            <p>
                                {Content.errorCanvas()}
                            </p>
                        </canvas>
                    </div>

                    <div className="col-md-6">
                        <canvas ref="output">
                            <p>
                                {Content.errorCanvas()}
                            </p>
                        </canvas>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col">
                        <h3 className="text-center" id="celebrityName" hidden>???</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div id="progress" className="progress" hidden>
                            <div id="progressBar" className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <h2 className="text-center" id="percentMatch">???</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;