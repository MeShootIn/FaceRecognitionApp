import React from "react";
import Content from "./content";
import * as faceapi from 'face-api.js';
import App from "../app";


/**
 * исправить размер canvasInput.width ...
 * для обрезки - посмотреть как работает функция drawImage ...
 * продумать и доделать "деструктор"
 * проверить адаптивность
 * динамическая загрузка изображений в Gallery из .json
 * 
 * !!!! исчезают линии
 */

const DECIMAL_PLACES = 2;

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            result: null,
            resizedResultsInput: null,
            resizedResultsOutput: null
        };
        this.updateResult = this.updateResult.bind(this);
        this.move = this.move.bind(this);
        this.frame = this.frame.bind(this);
        this.handleClickHidden = this.handleClickHidden.bind(this);
        this.handleClickDetails = this.handleClickDetails.bind(this);
        this.drawFaceLandmarksInput = this.drawFaceLandmarksInput.bind(this);
        this.drawFaceLandmarksOutput = this.drawFaceLandmarksOutput.bind(this);

        // App.hideById("result");
    }

    componentDidMount() {
        this.updateResult();
    }

    componentDidUpdate() {
        this.updateResult();
    }

    updateResult() {
        if (!this.state.result) {
            return;
        }

        let inputCanvas = document.getElementById("inputCanvas");
        let ctxInput = inputCanvas.getContext("2d");

        if (!ctxInput) {
            alert(Content.errorCanvas());
            return;
        }

        let inputImgHidden = document.getElementById("inputImgHidden");
        let inputImg = new Image();
        inputImg.src = inputImgHidden.src;

        inputImg.onload = () => {
            inputCanvas.width = inputImgHidden.width;
            inputCanvas.height = inputImgHidden.height;

            ctxInput.drawImage(inputImg, 0, 0);
        };

        inputImg.onerror = () => {
            alert(Content.errorImageUpload());
            return;
        };

        let outputCanvas = document.getElementById("outputCanvas");
        let ctxOutput = outputCanvas.getContext("2d");

        if (!ctxOutput) {
            alert(Content.errorCanvas());
            return;
        }

        let outputImgHidden = document.getElementById("outputImgHidden");
        let outputImg = new Image();
        outputImg.src = outputImgHidden.src;

        outputImg.onload = () => {
            outputCanvas.width = outputImgHidden.width;
            outputCanvas.height = outputImgHidden.height;

            ctxOutput.drawImage(outputImg, 0, 0);
        };

        outputImg.onerror = () => {
            alert(Content.errorImageUpload());
            return;
        };

        if (this.state.showDetails) {
            this.drawFaceLandmarksInput(inputImg, inputCanvas);
            this.drawFaceLandmarksOutput(outputImg, outputCanvas);
        }
    }

    // ОПТИМИЗИРОВАТЬ
    async getFaceLandmarks(img, canvas) {
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        // здесь скорее всего проблема при долгой загрузке
        const detectionsWithLandmarks = await faceapi.detectAllFaces(img).withFaceLandmarks();
        const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize);

        return resizedResults;
    }

    async drawFaceLandmarksInput(img, canvas) {
        if(!this.state.resizedResultsInput) {
            this.setState({
                resizedResultsInput: await this.getFaceLandmarks(img, canvas)
            });
        }

        faceapi.draw.drawFaceLandmarks(canvas, this.state.resizedResultsInput);
    }

    async drawFaceLandmarksOutput(img, canvas) {
        if(!this.state.resizedResultsOutput) {
            this.setState({
                resizedResultsOutput: await this.getFaceLandmarks(img, canvas)
            });
        }

        faceapi.draw.drawFaceLandmarks(canvas, this.state.resizedResultsOutput);
    }

    async frame(args) {
        let { target, t, T } = args;
        let progressBar = document.getElementById("progressBar");
        let percentMatch = document.getElementById("percentMatch");

        function f(t) {
            return 1 + Math.pow(t - 1, 3);
        }

        let percent = f(t / T) * target;
        progressBar.style.width = percent + "%";

        if (this.state.showDetails) {
            percentMatch.innerHTML = percent.toFixed(DECIMAL_PLACES);
        }
        else {
            percentMatch.innerHTML = parseInt(percent);
        }
    }

    async move(target, T) {
        for (let t = 0; t < T; ++t) {
            setTimeout(this.frame, t, {
                target: target,
                t: t,
                T: T
            });
        }
    }

    static upload(args) {
        let inputImgHidden = document.getElementById("inputImgHidden");
        let outputImgHidden = document.getElementById("outputImgHidden");
        let distanceHidden = document.getElementById("distanceHidden");
        let originalNameHidden = document.getElementById("originalNameHidden");
        let uploadButtonHidden = document.getElementById("uploadButtonHidden");

        inputImgHidden.src = args.inputSrc;
        originalNameHidden.value = args.originalName;
        distanceHidden.value = args.distance;

        inputImgHidden.onload = () => {
            outputImgHidden.src = args.outputSrc;

            outputImgHidden.onload = () => {
                uploadButtonHidden.click();
            }
        }
    }

    handleClickDetails() {
        let percentMatch = document.getElementById("percentMatch");
        this.setState((state) => ({
            showDetails: !state.showDetails
        }));

        if (!this.state.showDetails) {
            percentMatch.innerHTML = parseFloat(this.state.result.distance * 100).toFixed(DECIMAL_PLACES);
        }
        else {
            percentMatch.innerHTML = parseInt(percentMatch.innerHTML);
        }
    }

    handleClickHidden() {
        // [""].forEach(id => App.hideById(id));

        let originalName = document.getElementById("originalNameHidden").value;
        let distance = parseFloat(document.getElementById("distanceHidden").value);
        let T = 1000;

        this.setState({
            showDetails: false,
            result: {
                originalName: originalName,
                distance: distance
            }
        });
        this.move(distance * 100, T);
        App.showById("details");
    }

    render() {
        return (
            <div className="container mt-5" id="result">
                <img id="inputImgHidden" alt="inputHidden" hidden></img>
                <img id="outputImgHidden" alt="outputHidden" hidden></img>
                <input id="originalNameHidden" type="text" hidden></input>
                <input id="distanceHidden" type="text" hidden></input>
                <button id="uploadButtonHidden" onClick={this.handleClickHidden} hidden></button>

                <div className="row pt-3" id="details" hidden>
                    <div className="col-12">
                        <span className="pull-right"><button type="button" className="btn btn-outline-info" onClick={this.handleClickDetails}>{Content.moreDetails()}</button></span>
                    </div>

                    <div className="col-12 text-center">
                        <h2>
                            {Content.youLookLike()}<strong>{(this.state.result) ? Content.celebrityName(this.state.result.originalName) : null}</strong>{Content.on()}
                        </h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div id="progress" className="progress" hidden>
                            <div id="progressBar" className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <h2><span className="text-center" id="percentMatch">???</span>%</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="row pt-3">
                        <div className="col-md-12">
                            <canvas id="inputCanvas">{Content.errorCanvas()}</canvas>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="row pt-3">
                        <div className="col-md-12">
                            <canvas id="outputCanvas">{Content.errorCanvas()}</canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;