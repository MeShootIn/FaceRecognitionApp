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


/**
 * celebrityName.innerHTML
 */

class Upload extends React.Component {
    static fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];
    static fileTypesPrintable = Upload.fileTypes.map(type => type.split("/")[1]);

    constructor(props) {
        super(props);
        // Loadings
        this.state = {
            faceMatcher: null
        };
        this.loadingDependences();
        //
        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
    }

    initCardHeaders() {
        ["cardHeaderInitial", "cardHeaderSuccess", "cardHeaderErrorFileCount", "cardHeaderErrorFileType", "cardHeaderErrorNoFace", "cardHeaderErrorFaceCount"].forEach(id => App.hideById(id));
    }

    setErrorOnCard() {
        document.getElementById("card").className = "card border-danger";
        document.getElementById("cardHeader").className = "card-header bg-danger";
        App.scrollToAnchor("cardContainer");
    }

    loadingDependences = async () => {
        await faceAPI.loadModels();
        this.setState({ faceMatcher: await faceAPI.createMatcher(JSON_PROFILE) });
    };

    move(target, T) {
        let id = setInterval(frame, 1);
        let progressBar = document.getElementById("progressBar");
        let percentMatch = document.getElementById("percentMatch");
        let t = 0;

        function frame() {
            function f(t) {
                return 1 + Math.pow(t - 1, 3);
            }

            if (t >= T) {
                clearInterval(id);
            }
            else {
                t += 1;

                let percent = f(t / T) * target;
                progressBar.style.width = percent + "%";
                percentMatch.innerHTML = parseInt(percent) + "%";
            }
        }
    }

    async handleChange(event) {
        event.preventDefault();
        this.initCardHeaders();

        if (this.fileInput.current.files.length === 0) {
            return;
        }

        if (this.fileInput.current.files.length !== 1) {
            App.showById("cardHeaderErrorFileCount");
            this.setErrorOnCard();

            return;
        }

        let file = this.fileInput.current.files[0];
        let label = document.getElementById("customLabel");
        let celebrityName = document.getElementById("celebrityName");
        label.innerHTML = file.name;
        App.showById("spinner");

        if (Upload.fileTypes.includes(file.type)) {
            document.getElementById("card").className = "card border-success";
            document.getElementById("cardHeader").className = "card-header bg-success";
            App.showById("cardHeaderSuccess");

            // Face detection
            const image = await faceapi.bufferToImage(file);
            const detections = await faceAPI.getDetections(image);
            console.log(detections);

            let result = null;

            if (detections.length === 0) {
                console.log("there is no face on a picture");

                this.setErrorOnCard();
                App.hideById("cardHeaderSuccess");
                App.showById("cardHeaderErrorNoFace");
                App.hideById("spinner");

                return;
            }
            else {
                if (detections.length === 1) {
                    result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
                    console.log(result._label, result._distance);
                    App.showById("celebrityName");
                    celebrityName.innerHTML = Content.youLookLike(result._label); // !!!!!!!!!!!!!!!!!
                }
                else {
                    // result = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
                    // result.forEach(res => console.log(res.toString));
                    console.log(result);

                    this.setErrorOnCard();
                    App.hideById("cardHeaderSuccess");
                    App.showById("cardHeaderErrorFaceCount");
                    App.hideById("spinner");

                    return;
                }
            }
            //
            
            App.hideById("spinner");
            App.showById("progress");

            // Face matching
            let T = 500;

            this.move(result._distance * 100, T);
            Result.upload(URL.createObjectURL(file), imagesDict[result._label]);

            App.scrollToAnchor("result");
        }
        else {
            this.setErrorOnCard();
            App.showById("cardHeaderErrorFileType");
            App.hideById("spinner");
        }
    }

    render() {
        return (
            <div className="container pt-3 mt-3" id="cardContainer">
                <div className="card border-dark" id="card">
                    <div className="card-header" id="cardHeader">
                        <span id="cardHeaderInitial">{Content.uploadYourPicture()}</span>
                        <span id="cardHeaderSuccess" hidden>{Content.successUpload()}</span>
                        <span id="cardHeaderErrorFileCount" hidden>{Content.errorFileCount()}</span>
                        <span id="cardHeaderErrorFileType" hidden>{Content.errorFileType(Upload.fileTypesPrintable)}</span>
                        <span id="cardHeaderErrorNoFace" hidden>{Content.errorNoFace()}</span>
                        <span id="cardHeaderErrorFaceCount" hidden>{Content.errorFaceCount()}</span>
                    </div>

                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile"
                                            ref={this.fileInput} onChange={this.handleChange} accept={Upload.fileTypes} />
                                        <label className="custom-file-label" htmlFor="customFile" id="customLabel" data-browse={Content.uploadButton()}>
                                            {Content.chooseFile()}
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