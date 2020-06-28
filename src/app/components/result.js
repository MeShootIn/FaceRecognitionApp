import React from "react";
import Content from "./content";
import * as faceapi from 'face-api.js';


/**
 * добавить Content.celebrityName(index) {getFromJson("dataset.json", index);}
 * исправить размер canvasInput.width ...
 * для обрезки - посмотреть функцию drawImage
 */

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaded: false
        };
        this.updateCanvas = this.updateCanvas.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        if (!this.state.uploaded) {
            return;
        }

        let canvasInput = document.getElementById("inputCanvas");
        let ctxInput = canvasInput.getContext("2d");

        if (!ctxInput) {
            alert(Content.errorCanvas());
            return;
        }

        let inputImgHidden = document.getElementById("inputImgHidden");
        let input = new Image();
        input.src = inputImgHidden.src;

        input.onload = () => {
            canvasInput.width = inputImgHidden.width;
            canvasInput.height = inputImgHidden.height;

            ctxInput.drawImage(input, 0, 0);
        };

        input.onerror = () => {
            alert(Content.errorImageUpload());
            return;
        };

        let canvasOutput = document.getElementById("outputCanvas");
        let ctxOutput = canvasOutput.getContext("2d");

        if (!ctxOutput) {
            alert(Content.errorCanvas());
            return;
        }

        let outputImgHidden = document.getElementById("outputImgHidden");
        let output = new Image();
        output.src = outputImgHidden.src;

        output.onload = () => {
            canvasOutput.width = outputImgHidden.width;
            canvasOutput.height = outputImgHidden.height;

            ctxOutput.drawImage(output, 0, 0);
        };

        output.onerror = () => {
            alert(Content.errorImageUpload());
            return;
        };

        this.drawFaceLandmarks(input, canvasInput);
        this.drawFaceLandmarks(output, canvasOutput);
    }

    async drawFaceLandmarks(input, canvas) {
        const displaySize = { width: input.width, height: input.height };
        // resize the overlay canvas to the input dimensions
        faceapi.matchDimensions(canvas, displaySize);

        const detectionsWithLandmarks = await faceapi
            .detectAllFaces(input)
            .withFaceLandmarks();
        // resize the detected boxes and landmarks in case your displayed image has a different size than the original
        const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize);
        // draw the landmarks into the canvas
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
    }

    static upload(inputSrc, outputSrc) {
        let input = document.getElementById("inputImgHidden");
        let output = document.getElementById("outputImgHidden");
        let button = document.getElementById("uploadButtonHidden");

        input.src = inputSrc;

        input.onload = () => {
            output.src = outputSrc;

            output.onload = () => {
                button.click();
            }
        }
    }

    handleClick() {
        this.setState({
            uploaded: true
        });
    }

    render() {
        return (
            <div className="container mt-5" id="result">
                <img id="inputImgHidden" alt="inputHidden" hidden></img>
                <img id="outputImgHidden" alt="outputHidden" hidden></img>
                <button id="uploadButtonHidden" onClick={this.handleClick} hidden></button>

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

                <div className="d-flex justify-content-center">
                    <div className="row pt-3">
                        <div className="col-md-6">
                            <canvas id="inputCanvas">{Content.errorCanvas()}</canvas>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="row pt-3">
                        <div className="col-md-6">
                            <canvas id="outputCanvas">{Content.errorCanvas()}</canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;