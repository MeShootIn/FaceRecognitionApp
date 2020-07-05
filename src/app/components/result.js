import React from "react";
import Content from "./content";
import * as faceapi from 'face-api.js';
import App from "../app";


/**
 * для обрезки - посмотреть как работает функция drawImage ...
 * исправить адаптивность
 * сделать в каждой папке по 1 фото
 * 
 * ещё раз попробовать оптимизировать drawFaceLandmarks с учётом setState(updater[, callback])
 */

const DECIMAL_PLACES = 2;

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            result: null
        };
        this.inputImg = null;
        this.outputImg = null;

        this.updateCanvas = this.updateCanvas.bind(this);
        this.move = this.move.bind(this);
        this.frame = this.frame.bind(this);
        this.handleClickHidden = this.handleClickHidden.bind(this);
        this.handleClickDetails = this.handleClickDetails.bind(this);
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

    handleClickHidden() {
        let inputImgHidden = document.getElementById("inputImgHidden");
        let outputImgHidden = document.getElementById("outputImgHidden");
        let originalName = document.getElementById("originalNameHidden").value;
        let percent = parseFloat(document.getElementById("distanceHidden").value) * 100;
        let T = 1000;

        this.setState({
            showDetails: false,
            result: {
                originalName: originalName,
                percent: percent
            },
        });
        this.inputImg = inputImgHidden;
        this.outputImg = outputImgHidden;

        App.showById("result");
        this.move(percent, T);
        App.scrollToAnchor("result");
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    drawImg(inputCanvas, inputImgHidden) {
        let ctxInput = inputCanvas.getContext("2d");

        if (!ctxInput) {
            alert(Content.errorCanvas());
            return;
        }

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
    }

    updateCanvas() {
        if (!this.state.result) {
            return;
        }

        this.drawImg(document.getElementById("inputCanvas"), document.getElementById("inputImgHidden"));
        this.drawImg(document.getElementById("outputCanvas"), document.getElementById("outputImgHidden"));
    }

    async drawFaceLandmarks(img, canvas) {
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detectionsWithLandmarks = await faceapi.detectAllFaces(img).withFaceLandmarks();
        const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize);
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
    }

    frame(args) {
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

    handleClickDetails() {
        let percentMatch = document.getElementById("percentMatch");
        let buttonDetails = document.getElementById("buttonDetails");
        let inputCanvas = document.getElementById("inputCanvas");
        let outputCanvas = document.getElementById("outputCanvas");

        buttonDetails.disabled = true;

        this.setState((state) => ({
            showDetails: !state.showDetails
        }), async function () {
            if (this.state.showDetails) {
                await this.drawFaceLandmarks(this.inputImg, inputCanvas);
                this.drawImg(outputCanvas, this.outputImg);
                await this.drawFaceLandmarks(this.outputImg, outputCanvas);
            }

            buttonDetails.disabled = false;
        });

        if (!this.state.showDetails) {
            percentMatch.innerHTML = this.state.result.percent.toFixed(DECIMAL_PLACES);
        }
        else {
            percentMatch.innerHTML = parseInt(this.state.result.percent);
        }
    }

    render() {
        return (
            <div className="container mt-5" id="result" hidden>
                <img id="inputImgHidden" alt="inputHidden" hidden></img>
                <img id="outputImgHidden" alt="outputHidden" hidden></img>
                <input id="originalNameHidden" type="text" hidden></input>
                <input id="distanceHidden" type="text" hidden></input>
                <button id="uploadButtonHidden" onClick={this.handleClickHidden} hidden></button>

                <div className="row pt-3" id="details">
                    <div className="col-12">
                        <span className="pull-right"><button type="button" id="buttonDetails" className="btn btn-outline-info" onClick={this.handleClickDetails}>{Content.moreDetails()}</button></span>
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