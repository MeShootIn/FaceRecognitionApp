import React from "react";
import Content from "./content";
import * as faceAPI from "../faceapi";
import * as faceapi from 'face-api.js';
import { labels } from "../../resourсes/labels";
import App from "../app";
import Result from "./result";


// Loading imagies and descriptors of base pics
const JSON_PROFILE = require('../../resourсes/labeledFaceDescriptors.json');
const imagesDict = {};
labels.forEach(label => { imagesDict[label] = require(`../../resourсes/labeled_images/${label}/1.jpg`) });
//

const ResultCode = {
    INIT: 0,
    SUCCESS: 1,
    ERROR_FILE_COUNT: 2,
    ERROR_FILE_TYPE: 3,
    ERROR_NO_FACE: 4,
    ERROR_FACE_COUNT: 5
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
            fileName: null,
            resultCode: ResultCode.INIT
        };
        this.handleChange = this.handleChange.bind(this);
        this.fileInputRef = React.createRef();
    }

    setErrorOnCard() {
        document.getElementById("cardUpload").className = "card border-danger";
        document.getElementById("cardHeaderUpload").className = "card-header bg-danger";
        App.scrollToAnchor("cardUploadContainer");
    }

    loadingDependences = async () => {
        await faceAPI.loadModels();
        this.setState({ faceMatcher: await faceAPI.createMatcher(JSON_PROFILE) });
    };

    uploadStatus(resultCode) {
        switch(resultCode) {
            case ResultCode.INIT: {
                return Content.uploadYourPicture();
            }
            case ResultCode.SUCCESS: {
                return Content.successUpload();
            }
            case ResultCode.ERROR_FILE_COUNT: {
                return Content.errorFaceCount();
            }
            case ResultCode.ERROR_FILE_TYPE: {
                return Content.errorFileType(Upload.fileTypesPrintable);
            }
            case ResultCode.ERROR_NO_FACE: {
                return Content.errorNoFace();
            }
            case ResultCode.ERROR_FACE_COUNT: {
                return Content.errorFaceCount();
            }
            default: {
                return null;
            }
        }
    }

    async handleChange(event) {
        event.preventDefault();

        if (this.fileInputRef.current.files.length === 0) {
            return;
        }

        if (this.fileInputRef.current.files.length !== 1) {
            this.setErrorOnCard();
            this.setState({
                resultCode: ResultCode.ERROR_FILE_COUNT
            });

            return;
        }

        let file = this.fileInputRef.current.files[0];
        let cardUpload = document.getElementById("cardUpload");
        let cardHeaderUpload = document.getElementById("cardHeaderUpload");
        this.setState({
            fileName: file.name
        });
        App.showById("spinner");

        if (Upload.fileTypes.includes(file.type)) {
            cardUpload.className = "card border-success";
            cardHeaderUpload.className = "card-header bg-success";
            this.setState({
                resultCode: ResultCode.SUCCESS
            });

            // Face detection
            const image = await faceapi.bufferToImage(file);
            const detections = await faceAPI.getDetections(image);
            let result = null;

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
                if (detections.length === 1) {
                    result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
                    console.log(result._label, result._distance);
                }
                else {
                    console.log(result);

                    this.setErrorOnCard();
                    this.setState({
                        resultCode: ResultCode.ERROR_FACE_COUNT
                    });
                    App.hideById("spinner");

                    return;
                }
            }
            //

            App.hideById("spinner");
            App.showById("progress");
            App.scrollToAnchor("result");
            Result.upload({
                inputSrc: URL.createObjectURL(file),
                outputSrc: imagesDict[result._label],
                originalName: result._label,
                distance: result._distance
            });
        }
        else {
            this.setErrorOnCard();
            this.setState({
                resultCode: ResultCode.ERROR_FILE_TYPE
            });
            App.hideById("spinner");
        }
    }

    render() {
        return (
            <div className="container pt-3 mt-3" id="cardUploadContainer">
                <div className="card border-dark" id="cardUpload">
                    <div className="card-header" id="cardHeaderUpload">
                        {this.uploadStatus(this.state.resultCode)}
                    </div>

                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                            ref={this.fileInputRef} onChange={this.handleChange} accept={Upload.fileTypes} />
                                        <label className="custom-file-label" htmlFor="customFile" id="customLabel" data-browse={Content.uploadButton()}>
                                            {(this.state.fileName) ? this.state.fileName : Content.chooseFile()}
                                        </label>
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