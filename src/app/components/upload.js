import React from "react";
import Content from "./content";
import * as faceAPI from "../faceapi";
import * as faceapi from 'face-api.js';
import {labels} from "../../resourсes/labels";

// import face001 from '../../resourсes/face001.jpg';
// import face002 from '../../resourсes/face002.jpg';
// import face003 from '../../resourсes/face003.jpg';
// import face004 from '../../resourсes/face004.jpg';

// Loading imagies and descriptors of base pics
const JSON_PROFILE = require('../../resourсes/labeledFaceDescriptors.json');
const imagesDict = {}
labels.forEach(label => {imagesDict[label] = require(`../../resourсes/labeled_images/${label}/1.jpg`)})
//

class Upload extends React.Component {
    static fileTypes = ["image/jpeg", "image/pjpeg", "image/jpg", "image/png"];
    static fileTypesPrintable = ["jpeg", "jpg", "png"];

    constructor(props) {
        super(props);
        //Loadings
        this.state = {faceMatcher: null };
        this.loadingDependences();
        //
        this.handleChange = this.handleChange.bind(this);
        this.fileInput = React.createRef();
    }

    loadingDependences = async () => {
        await faceAPI.loadModels();
        this.setState({ faceMatcher: await faceAPI.createMatcher(JSON_PROFILE) });
      };

    // [a, b]
    // getRandomInt(a, b) {
    //     return Math.floor(Math.random() * (b - a + 1) + a);
    // }

    move(target, T, frames) {
        let dt = T / frames;
        let id = setInterval(frame, dt);
        let match = document.getElementById("match");
        let percentText = document.getElementById("percent");
        let t = 0;

        function frame() {
            function f(t) {
                return 1 + Math.pow(t - 1, 3);
            }

            if (t >= T) {
                clearInterval(id);
            }
            else {
                t += dt;
                let percent = f(t / T) * target;
                match.style.width = percent + "%";
                percentText.innerHTML = parseInt(percent) + "%";
            }
        }
    }

    async handleChange(event) {
        event.preventDefault();

        if (this.fileInput.current.files.length !== 1) {
            return;
        }

        let file = this.fileInput.current.files[0];
        let label = document.getElementById("customLabel");

        label.innerHTML = file.name;

        if (Upload.fileTypes.includes(file.type)) {
            let input = document.getElementById("input");

            document.getElementById("card").className = "card border-success";
            document.getElementById("cardHeader").className = "card-header bg-success";
            // Face detection
            const image = await faceapi.bufferToImage(file);
            const detections = await faceAPI.getDetections(image);
            console.log(detections);
            let result = null;
            if(detections.length === 0){
                console.log("there is no face on a picture");
            }else{
                if(detections.length === 1){
                    result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
                    console.log(result._label,result._distance);
                }else{
                    result = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
                    // result.forEach(res => console.log(res.toString));
                    console.log(result);
                }
            }
            //
            input.src = URL.createObjectURL(file);
            input.hidden = false;
            document.getElementById("cardHeader").textContent = Content.successUpload();

            // рандом            
            // let src = [face001, face002, face003, face004];
            // let rnd = this.getRandomInt(0, 100);

            let output = document.getElementById("output");
            //Face matching
            let src = null;
            if(detections.length === 1){
                // match.textContent = Content.match() + result._label + " on " + Math.round(result._distance*100) + "%";
                src = imagesDict[result._label];
            }else{
                // match.textContent = Content.match() + result[0]._label + " on " + Math.round(result[0]._distance*100) + "%";
                src = imagesDict[result[0]._label];
            }
            output.src = src;
            //
            let T = 500;
            this.move(result[0]._distance*100, T, T);
            // output.src = src[this.getRandomInt(0, 3)];
            output.hidden = false;

            this.scrollToAnchor("input");
        }
        else {
            document.getElementById("card").className = "card border-danger";
            document.getElementById("cardHeader").className = "card-header bg-danger";
            document.getElementById("cardHeader").textContent = Content.wrongFileFormat() + Upload.fileTypesPrintable + ")";

            this.scrollToAnchor("card");
        }
    }

    scrollToAnchor(anchor) {
        let elem = document.getElementById(anchor);

        elem.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="container pt-3 mt-3">
                <div id="spinner" className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <div className="card border-dark" id="card">
                    <div className="card-header" id="cardHeader">
                        {Content.uploadYourPicture()}
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
            </div>
        );
    }
}

export default Upload;