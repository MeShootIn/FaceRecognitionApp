import React from "react";
import Content from "./content";
import * as faceAPI from "../faceapi";
import * as faceapi from 'face-api.js';
import App from "../app";
import Upload from "./upload";



const DECIMAL_PLACES = 2;
const T = 1000;

/**
 * лагает this.move + остановка при новом ввызове update
 * сделать this.state.scrolled: bool для отмены this.move через setState
 */

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            imageIndex: 0
        };

        this.update = this.update.bind(this);
        this.move = this.move.bind(this);
        this.frame = this.frame.bind(this);
        this.handleClickHidden = this.handleClickHidden.bind(this);
        this.handleClickDetails = this.handleClickDetails.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.getCurrentPercent = this.getCurrentPercent.bind(this);
        this.getOutputImg = this.getOutputImg.bind(this);
    }

    static upload() {
        let uploadButtonHidden = document.getElementById("uploadButtonHidden");
        uploadButtonHidden.click();
    }

    async handleClickHidden() {
        let scrollButtonRow = document.getElementById("scrollButtonRow");

        await this.setState({
            showDetails: false,
            imageIndex: 0
        });

        if (Upload.resultObject.info.length === 1) {
            scrollButtonRow.hidden = true;
        }
        else {
            scrollButtonRow.hidden = false;
        }

        App.showById("result");
        App.scrollToAnchor("result");
        this.move(this.getCurrentPercent());
    }

    componentDidUpdate() {
        this.update();
    }

    drawImg(img, canvas) {
        let ctx = canvas.getContext("2d");

        if (!ctx) {
            alert(Content.errorCanvas());
            return;
        }

        let image = new Image();
        image.src = img.src;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            ctx.drawImage(image, 0, 0);
        };

        image.onerror = () => {
            alert(Content.errorImageUpload());
            return;
        };
    }

    getCurrentPercent() {
        return (1 - parseFloat(Upload.resultObject.info[this.state.imageIndex].distance)) * 100;
    }

    getInputImg() {
        return Upload.resultObject.inputImg;
    }

    getOutputImg() {
        return Upload.resultObject.info[this.state.imageIndex].outputImg;
    }

    async update() {
        if (Upload.resultObject.info === null) {
            return;
        }

        Result.disableButtons(true);

        let inputCanvas = document.getElementById("inputCanvas");
        let outputCanvas = document.getElementById("outputCanvas");

        this.drawImg(this.getInputImg(), inputCanvas);
        this.drawImg(this.getOutputImg(), outputCanvas);

        if (this.state.showDetails) {
            await this.drawFaceLandmarks(this.getInputImg(), inputCanvas, this.state.imageIndex);
            this.drawImg(this.getOutputImg(), outputCanvas);
            await this.drawFaceLandmarks(this.getOutputImg(), outputCanvas, 0);
        }

        Result.disableButtons(false);
    }

    async drawFaceLandmarks(img, canvas, faceIndex) {
        const displaySize = { width: img.width, height: img.height };
        faceapi.matchDimensions(canvas, displaySize);

        const detectionsWithLandmarks = (await faceAPI.getDetections(img)).sort((a, b) => (a.alignedRect._box._x - b.alignedRect._box._x));
        const resizedResults = faceapi.resizeResults([detectionsWithLandmarks[faceIndex]], displaySize);
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
    }

    frame(target, t) {
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

    async move(target) {
        for (let t = 0; t < T; ++t) {
            setTimeout(this.frame, t, target, t);
        }
    }

    static disableButtons(value) {
        ["buttonPrevFace", "buttonNextFace", "naive", "advanced", "buttonDetails"].forEach((buttonId) => {
            document.getElementById(buttonId).disabled = value;
        })
    }

    handleClickDetails() {
        let percentMatch = document.getElementById("percentMatch");
        let scrollButtonRow = document.getElementById("scrollButtonRow");

        this.setState((state) => ({
            showDetails: !state.showDetails
        }), () => {
            if (this.state.showDetails) {
                if(Upload.resultObject.info.length > 1) {
                    scrollButtonRow.hidden = false;
                }
                percentMatch.innerHTML = this.getCurrentPercent().toFixed(DECIMAL_PLACES);
            }
            else {
                scrollButtonRow.hidden = true;
                percentMatch.innerHTML = parseInt(this.getCurrentPercent());
            }
        });
    }

    handleClickPrev() {
        if (document.getElementById("buttonPrevFace").disabled) {
            return;
        }

        this.setState((state) => ({
            imageIndex: (state.imageIndex > 0) ? state.imageIndex - 1 : Upload.resultObject.info.length - 1
        }), () => {
            this.move(this.getCurrentPercent());
        });
    }

    handleClickNext() {
        if (document.getElementById("buttonNextFace").disabled) {
            return;
        }

        this.setState((state) => ({
            imageIndex: (state.imageIndex < Upload.resultObject.info.length - 1) ? state.imageIndex + 1 : 0
        }), () => {
            this.move(this.getCurrentPercent());
        });
    }

    render() {
        return (
            <div className="container mt-5" id="result" hidden>
                <button id="uploadButtonHidden" onClick={this.handleClickHidden} hidden></button>

                <div className="row pt-3">
                    <div className="col text-center">
                        <h2>
                            {Content.youLookLike()}<strong>{(Upload.resultObject.info !== null) ? Content.celebrityName(Upload.resultObject.info[this.state.imageIndex].outputName) : null}</strong>{Content.on()}
                        </h2>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col">
                        <div id="progress" className="progress" hidden>
                            <div id="progressBar" className="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <h2><span className="text-center" id="percentMatch">???</span>%</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row pt-1">
                    <div className="col">
                        <span className="float-right">
                            <button type="button" id="buttonDetails" className="btn btn-outline-warning btn-lg btn-block" onClick={this.handleClickDetails}>{Content.moreDetails()}</button>
                        </span>
                    </div>
                </div>

                <div className="row d-flex justify-content-center pt-5" id="scrollButtonRow" hidden>
                    <div className="col">
                        <span className="float-left">
                            <button type="button" id="buttonPrevFace" className="btn btn-info btn-lg" onClick={this.handleClickPrev}>
                                <i className="fas fa-angle-double-left"></i>
                            </button>
                        </span>
                    </div>

                    <div className="col">
                        <span className="float-right">
                            <button type="button" id="buttonNextFace" className="btn btn-info btn-lg" onClick={this.handleClickNext}>
                                <i className="fas fa-angle-double-right"></i>
                            </button>
                        </span>
                    </div>
                </div>

                <div className="row d-flex justify-content-center pt-3">
                    <canvas className="col-11 col-sm-10 col-md-9 col-xl-8" id="inputCanvas">{Content.errorCanvas()}</canvas>
                </div>

                <div className="row d-flex justify-content-center pt-3">
                    <canvas className="col-11 col-sm-10 col-md-9 col-xl-8" id="outputCanvas">{Content.errorCanvas()}</canvas>
                </div>
            </div>
        );
    }
}

export default Result;