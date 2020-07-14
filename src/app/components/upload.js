import React from "react";
import Content from "./content";
import * as faceAPI from "../faceapi";
import * as faceapi from 'face-api.js';
// import { labels } from "../../resourсes/labels";
import App from "../app";
import Result from "./result";


// Loading imagies and descriptors of base pics
const JSON_PROFILE_DESC = require('../../resourсes/labeledFaceDescriptors.json');
const JSON_PROFILE_LAND = require('../../resourсes/labeledFaceLandmarks.json');
// const imagesDict = {};
// labels.forEach(label => { imagesDict[label] = require(`../../resourсes/labeled_images/${label}/1.jpg`) });
//

const ResultCode = {
    INIT: 0,
    SUCCESS: 1,
    ERROR_FILE_COUNT: 2,
    ERROR_FILE_TYPE: 3,
    ERROR_NO_FACE: 4
};

const Algorithm = {
    NAIVE: 0,
    ADVANCED: 1
};

class Upload extends React.Component {
    static fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];
    static fileTypesPrintable = Upload.fileTypes.map(type => type.split("/")[1]);

    constructor(props) {
        super(props);
        // Loadings
        this.loadingDependences = this.loadingDependences.bind(this);
        this.loadingDependences();
        //
        this.state = {
            faceMatcher: null,
            file: null,
            resultCode: ResultCode.INIT,
            algorithm: Algorithm.ADVANCED
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNaive = this.handleChangeNaive.bind(this);
        this.handleChangeAdvanced = this.handleChangeAdvanced.bind(this);
        this.fileInputRef = React.createRef();
    }

    setErrorOnCard() {
        document.getElementById("cardUpload").className = "card border-danger";
        document.getElementById("cardHeaderUpload").className = "card-header bg-danger";
        App.scrollToAnchor("cardUploadContainer");
    }

    async loadingDependences() {
        await faceAPI.loadModels();
        this.setState({ faceMatcher: await faceAPI.createMatcher(JSON_PROFILE_DESC) });
    };

    uploadStatus(resultCode) {
        switch (resultCode) {
            case ResultCode.INIT: {
                return Content.uploadYourPicture();
            }
            case ResultCode.SUCCESS: {
                return Content.successUpload();
            }
            case ResultCode.ERROR_FILE_COUNT: {
                return Content.errorFileCount();
            }
            case ResultCode.ERROR_FILE_TYPE: {
                return Content.errorFileType(Upload.fileTypesPrintable);
            }
            case ResultCode.ERROR_NO_FACE: {
                return Content.errorNoFace();
            }
            default: {
                return null;
            }
        }
    }

    faceRecognitionNaive(faceInput, facesProfile){
        const labels = Object.keys(facesProfile);
        const inputPosition = Array.from(faceInput.landmarks._positions);
        const inputRelativePosition = Array.from(faceInput.landmarks.relativePositions);
        const len = inputPosition.length;
        const result = labels.reduce((minDist, label) => {
            const curLabelPosition = Array.from(facesProfile[label].position);
            const curLabelRelativePosition = Array.from(facesProfile[label].relativePosition);

            let curPosDist = Math.sqrt(
                curLabelPosition
                  .map((val, i) => Math.sqrt(
                    Math.pow((val._x - inputPosition[i]._x)/Math.max(val._x,inputPosition[i]._x),2) + 
                    Math.pow((val._y - inputPosition[i]._y)/Math.max(val._y,inputPosition[i]._y),2)))
                  .reduce((res, diff) => res + Math.pow(diff, 2), 0)
              )/len;
            console.log("curPosDist = ",curPosDist);

            let curRelDist = Math.sqrt(
                curLabelRelativePosition
                .map((val, i) => Math.sqrt(
                    Math.pow((val._x - inputRelativePosition[i]._x)/Math.max(val._x,inputRelativePosition[i]._x),2) + 
                    Math.pow((val._y - inputRelativePosition[i]._y)/Math.max(val._y,inputRelativePosition[i]._y),2)))
                  .reduce((res, diff) => res + Math.pow(diff, 2), 0)
              )/len;
            console.log("curRelDist = ",curRelDist);

            if(curRelDist < minDist.distance){
                return {"_label": label, "_distance": curRelDist};
            }else{
                return minDist;
            }
            
        }, {"label": "Unknown", "distance": 1.0});
        console.log("result = ",result);
        return result;
    }

    async faceRecognition() {
        const image = await faceapi.bufferToImage(this.state.file);
        let detections = null;
        let result = null;

        if(this.state.algorithm === Algorithm.ADVANCED) {
            detections = await faceAPI.getDetections(image);
        }else{
            detections = await faceAPI.getDetections(image, false);
        }

        console.log(detections);

        if (detections.length === 0) {
            console.log("there is no face on a picture");

            this.setErrorOnCard();
            this.setState({
                resultCode: ResultCode.ERROR_NO_FACE
            });
            App.hideById("spinner");

            return;
        }
        else {
            console.log('here info goes --------');
            console.log(detections);
            if (detections.length === 1) {
                if(this.state.algorithm === Algorithm.ADVANCED){
                    result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
                }else{
                    result = this.faceRecognitionNaive(detections[0],JSON_PROFILE_LAND);
                }
                console.log(result._label, result._distance);
                console.log(JSON_PROFILE_DESC[result._label]);
            }
            else {
                if(this.state.algorithm === Algorithm.ADVANCED){
                    result = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
                }else{
                    result = detections.map(d => this.faceRecognitionNaive(d,JSON_PROFILE_LAND));
                }
                console.log(result);
                console.log(JSON_PROFILE_DESC[result[0]._label]);
                return;
            }
        }

        let outputImage = require(`../../resourсes/labeled_images/${result._label}.jpg`);
        let outputName = result._label.replace(/\s\d$/, '');

        App.hideById("spinner");
        App.showById("progress");
        Result.upload({
            inputSrc: URL.createObjectURL(this.state.file),
            outputSrc: outputImage,
            originalName: outputName,
            distance: result._distance,
        });
    }

    async handleChange(event) {
        event.preventDefault();

        if (this.fileInputRef.current.files.length === 0) {
            return;
        }

        App.hideById("result");
        await this.setState({
            file: null
        });

        if (this.fileInputRef.current.files.length !== 1) {
            this.setErrorOnCard();
            this.setState({
                resultCode: ResultCode.ERROR_FILE_COUNT
            });

            return;
        }

        await this.setState({
            file: this.fileInputRef.current.files[0]
        });

        let cardUpload = document.getElementById("cardUpload");
        let cardHeaderUpload = document.getElementById("cardHeaderUpload");
        App.showById("spinner");

        if (Upload.fileTypes.includes(this.state.file.type)) {
            cardUpload.className = "card border-success";
            cardHeaderUpload.className = "card-header bg-success";

            this.setState({
                resultCode: ResultCode.SUCCESS
            }, this.faceRecognition);
        }
        else {
            this.setErrorOnCard();
            App.hideById("spinner");

            this.setState({
                resultCode: ResultCode.ERROR_FILE_TYPE
            });
        }
    }

    handleChangeNaive() {
        this.setState({
            algorithm: Algorithm.NAIVE
        }, () => {
            if(this.state.file) {
                this.faceRecognition()
            }
        });
    }

    handleChangeAdvanced() {
        this.setState({
            algorithm: Algorithm.ADVANCED
        }, () => {
            if(this.state.file) {
                this.faceRecognition()
            }
        });
    }

    render() {
        return (
            <div className="container mt-3" id="cardUploadContainer">
                <div className="card border-dark" id="cardUpload">
                    <div className="card-header" id="cardHeaderUpload">
                        {this.uploadStatus(this.state.resultCode)}
                    </div>

                    <div className="card-body">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                {/* px */}
                                <div className="col-12 px-1">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                            ref={this.fileInputRef} onChange={this.handleChange} accept={Upload.fileTypes} />
                                        <label className="custom-file-label" htmlFor="customFile" id="customLabel" data-browse={Content.uploadButton()}>
                                            {(this.state.file) ? this.state.file.name : Content.chooseFile()}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row pt-3 d-flex justify-content-center">
                                <div className="col-12">
                                    <span className="float-right">{Content.algorithm()}</span>
                                </div>

                                <div className="col-12">
                                    <div className="custom-control custom-radio float-right">
                                        <input type="radio" id="naive" name="customRadio" className="custom-control-input" onChange={this.handleChangeNaive} />
                                        <label className="custom-control-label" htmlFor="naive">{Content.naive()}</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="custom-control custom-radio float-right">
                                        <input type="radio" defaultChecked id="advanced" name="customRadio" className="custom-control-input" onChange={this.handleChangeAdvanced} />
                                        <label className="custom-control-label" htmlFor="advanced">{Content.advanced()}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <div id="spinner" className="spinner-border text-secondary" role="status" hidden>
                        <span className="sr-only">{Content.loading()}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;