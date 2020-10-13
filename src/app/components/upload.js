import React from 'react';
import Content from './content';
import * as faceAPI from '../faceapi';
import * as faceapi from 'face-api.js';
import App from '../app';
import Result from './result';



const JSON_PROFILE_DESC = require('../../resourсes/labeledFaceDescriptors.json');
const JSON_PROFILE_LAND = require('../../resourсes/labeledFaceLandmarks.json');
const ResultCode = {
    INIT: 0,
    SUCCESS_UPLOAD: 1,
    ERROR_FILE_COUNT: 2,
    ERROR_FILE_TYPE: 3,
    ERROR_NO_FACE: 4
};

const Algorithm = {
    NAIVE: 0,
    ADVANCED: 1
};

class Upload extends React.Component {
    static fileTypes = ['image/jpeg', 'image/pjpeg', 'image/jpg', 'image/png'];
    static fileTypesPrintable = Upload.fileTypes.map(type => type.split('/')[1]);

    constructor(props) {
        super(props);

        this.state = {
            faceMatcher: null,
            file: null,
            resultCode: ResultCode.INIT,
            algorithm: Algorithm.ADVANCED
        };
        this.loadingDependences = this.loadingDependences.bind(this);
        this.loadingDependences();
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNaive = this.handleChangeNaive.bind(this);
        this.handleChangeAdvanced = this.handleChangeAdvanced.bind(this);
        this.fileInputRef = React.createRef();
    }

    setErrorOnCard() {
        document.getElementById('cardUpload').className = 'card border-danger';
        document.getElementById('cardHeaderUpload').className = 'card-header bg-danger';
        App.scrollToAnchor('cardUploadContainer');
    }

    async loadingDependences() {
        await faceAPI.loadModels();
        this.setState({
            faceMatcher: await faceAPI.createMatcher(JSON_PROFILE_DESC)
        });
    };

    uploadStatus(resultCode) {
        switch (resultCode) {
            case ResultCode.INIT: {
                return Content.uploadYourPicture();
            }
            case ResultCode.SUCCESS_UPLOAD: {
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

    faceRecognitionNaive(faceInput, facesProfile) {
        const labels = Object.keys(facesProfile);
        const inputPosition = Array.from(faceInput.landmarks._positions);
        const inputRelativePosition = Array.from(faceInput.landmarks.relativePositions);
        const len = inputPosition.length;
        const result = labels.reduce((minDist, label) => {
            const curLabelRelativePosition = Array.from(facesProfile[label].relativePosition);

            let curRelDist = Math.sqrt(
                curLabelRelativePosition
                    .map((val, i) => Math.sqrt(
                        Math.pow((val._x - inputRelativePosition[i]._x), 2) +
                        Math.pow((val._y - inputRelativePosition[i]._y), 2)))
                    .reduce((res, diff) => res + Math.pow(diff, 2), 0)
            ) / len;

            if (curRelDist < minDist._distance) {
                return { '_label': label, '_distance': curRelDist };
            } else {
                return minDist;
            }

        }, { '_label': 'Unknown', '_distance': 1.0 });
        result._distance *= 10;

        return result;
    }

    static resultObject = {
        inputImg: null,
        info: null
    };

    async faceRecognition() {
        console.group('Face recognition');
        Result.disableButtons(true);

        const image = await faceapi.bufferToImage(this.state.file);
        let detections = null;
        let results = null;

        if (this.state.algorithm === Algorithm.ADVANCED) {
            detections = await faceAPI.getDetectionsWithLogs(image);
        } else {
            detections = await faceAPI.getDetectionsWithLogs(image, false);
        }

        if (detections.length === 0) {
            console.log('There is no face on a picture');

            this.setErrorOnCard();
            this.setState({
                resultCode: ResultCode.ERROR_NO_FACE
            });
            App.hideById('spinner');
            console.groupEnd();
            Result.disableButtons(false);

            return;
        }
        else {
            detections = detections.sort((a, b) => (a.alignedRect._box._x - b.alignedRect._box._x));

            console.log(detections);

            if (this.state.algorithm === Algorithm.ADVANCED) {
                results = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
            } else {
                results = detections.map(d => this.faceRecognitionNaive(d, JSON_PROFILE_LAND));
            }
        }

        let inputImg = new Image();
        inputImg.src = URL.createObjectURL(this.state.file);

        inputImg.onload = () => {
            Upload.resultObject = {
                inputImg: inputImg,
                info: []
            };

            let imgs = results.map((result) => {
                let outputImg = new Image();
                outputImg.src = require(`../../resourсes/labeled_images/${result._label}.jpg`);

                return outputImg;
            });

            function imgIsLoaded(img, i) {
                return new Promise((resolve) => {
                    img.onload = () => {
                        Upload.resultObject.info.push({
                            inputBox: {
                                x: detections[i].alignedRect._box._x,
                                y: detections[i].alignedRect._box._y,
                                width: detections[i].alignedRect._box._width,
                                height: detections[i].alignedRect._box._height
                            },

                            outputName: results[i]._label.replace(/\s\d$/, ''),
                            outputImg: img,
                            distance: results[i]._distance
                        });

                        resolve();
                    };
                });
            }

            Promise.all(imgs.map(imgIsLoaded)).then(() => {
                console.groupEnd();
                App.hideById('spinner');
                App.showById('progress');
                Result.disableButtons(false);

                Result.upload();
            });
        };
    }

    async handleChange(event) {
        event.preventDefault();

        if (this.fileInputRef.current.files.length === 0) {
            return;
        }

        App.hideById('result');
        await this.setState({
            file: null
        });
        Upload.resultObject = {
            inputImg: null,
            info: null
        };

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

        let cardUpload = document.getElementById('cardUpload');
        let cardHeaderUpload = document.getElementById('cardHeaderUpload');
        App.showById('spinner');

        if (Upload.fileTypes.includes(this.state.file.type)) {
            cardUpload.className = 'card border-success';
            cardHeaderUpload.className = 'card-header bg-success';

            this.setState({
                resultCode: ResultCode.SUCCESS_UPLOAD
            }, this.faceRecognition);
        }
        else {
            this.setErrorOnCard();
            App.hideById('spinner');

            this.setState({
                resultCode: ResultCode.ERROR_FILE_TYPE
            });
        }
    }

    handleChangeNaive() {
        this.setState({
            algorithm: Algorithm.NAIVE
        }, () => {
            if (this.state.resultCode === ResultCode.SUCCESS_UPLOAD) {
                this.faceRecognition();
            }
        });
    }

    handleChangeAdvanced() {
        this.setState({
            algorithm: Algorithm.ADVANCED
        }, () => {
            if (this.state.resultCode === ResultCode.SUCCESS_UPLOAD) {
                this.faceRecognition();
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
                                <div className="col-12 px-1">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                            ref={this.fileInputRef} onChange={this.handleChange} accept={Upload.fileTypes} />
                                        <label className="custom-file-label" htmlFor="customFile" id="customLabel"
                                            data-browse={Content.uploadButton()}>
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
                                        <input type="radio" id="naive" name="customRadio" className="custom-control-input"
                                            onChange={this.handleChangeNaive} />
                                        <label className="custom-control-label" htmlFor="naive">{Content.naive()}</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="custom-control custom-radio float-right">
                                        <input type="radio" defaultChecked id="advanced" name="customRadio"
                                            className="custom-control-input" onChange={this.handleChangeAdvanced} />
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