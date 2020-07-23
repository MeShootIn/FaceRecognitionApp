import React from "react";
import * as faceAPI from "./faceapi";
import * as faceapi from 'face-api.js';


// Loading imagies and descriptors of base pics
// const JSON_PROFILE_DESC = require('../../resourсes/labeledFaceDescriptors.json');
// const JSON_PROFILE_LAND = require('../../resourсes/labeledFaceLandmarks.json');

export const Algorithm = {
    NAIVE: 0,
    ADVANCED: 1
};

export async function faceRecognition(file, algorithm) {
    const image = await faceapi.fetchImage(file);
    let detections = await faceAPI.getDetections(image, (algorithm === Algorithm.ADVANCED));
    return detections;
}

export function EuclideanDistance(face_1, face_2) {
    const len = face_1.length;
    let dist = 0;
    let diff;

    for (let i = 0; i < len; ++i) {
        diff = face_1[i] - face_2[i];
        dist += diff * diff;
    }

    return Math.sqrt(dist);
}

function  faceRecognitionNaive(faceInput, facesProfile) {
    const labels = Object.keys(facesProfile);
    const inputPosition = Array.from(faceInput.landmarks._positions);
    const inputRelativePosition = Array.from(faceInput.landmarks.relativePositions);
    const len = inputPosition.length;
    const result = labels.reduce((minDist, label) => {
        const curLabelPosition = Array.from(facesProfile[label].position);
        const curLabelRelativePosition = Array.from(facesProfile[label].relativePosition);

        let curRelDist = Math.sqrt(
            curLabelRelativePosition
            .map((val, i) => Math.sqrt(
                Math.pow((val._x - inputRelativePosition[i]._x),2) + 
                Math.pow((val._y - inputRelativePosition[i]._y),2)))
              .reduce((res, diff) => res + Math.pow(diff, 2), 0)
          )/len;

        if(curRelDist < minDist._distance){
            return {"_label": label, "_distance": curRelDist};
        }else{
            return minDist;
        }
        
    }, {"_label": "Unknown", "_distance": 1.0});
    result._distance *= 10;
    return result;
}

//class FaceRecognition extends React.Component {
    

    // constructor(props) {
    //     super(props);
    //     // Loadings
    //     this.loadingDependences = this.loadingDependences.bind(this);
    //     this.loadingDependences();
    //     //
    //     this.state = {
    //         faceMatcher: null,
    //         file: null,
    //         resultCode: ResultCode.INIT,
    //         algorithm: Algorithm.ADVANCED
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleChangeNaive = this.handleChangeNaive.bind(this);
    //     this.handleChangeAdvanced = this.handleChangeAdvanced.bind(this);
    //     this.fileInputRef = React.createRef();
    // }

    // async loadingDependences() {
    //     await faceAPI.loadModels();
    //     this.setState({ faceMatcher: await faceAPI.createMatcher(JSON_PROFILE_DESC) });
    // };

    // faceRecognitionNaive(faceInput, facesProfile){
    //     const labels = Object.keys(facesProfile);
    //     const inputPosition = Array.from(faceInput.landmarks._positions);
    //     const inputRelativePosition = Array.from(faceInput.landmarks.relativePositions);
    //     const len = inputPosition.length;
    //     const result = labels.reduce((minDist, label) => {
    //         const curLabelPosition = Array.from(facesProfile[label].position);
    //         const curLabelRelativePosition = Array.from(facesProfile[label].relativePosition);

    //         let curRelDist = Math.sqrt(
    //             curLabelRelativePosition
    //             .map((val, i) => Math.sqrt(
    //                 Math.pow((val._x - inputRelativePosition[i]._x),2) + 
    //                 Math.pow((val._y - inputRelativePosition[i]._y),2)))
    //               .reduce((res, diff) => res + Math.pow(diff, 2), 0)
    //           )/len;

    //         if(curRelDist < minDist._distance){
    //             return {"_label": label, "_distance": curRelDist};
    //         }else{
    //             return minDist;
    //         }
            
    //     }, {"_label": "Unknown", "_distance": 1.0});
    //     result._distance *= 10;
    //     return result;
    // }

    // static async faceRecognition(file, algorithm) {
    //     const image = await faceapi.fetchImage(file);
    //     let detections;
   

    //     if(algorithm === FaceRecognition.Algorithm.ADVANCED) {
    //         detections = await faceAPI.getDetections(image);
    //     }else{
    //         detections = await faceAPI.getDetections(image, false);
    //     }
    //     return detections;
    // }

    // async do() {
    //     let result = null;
    //     let detections = await this.faceRecognition(this.state.file, this.state.algorithm);

    //     if (detections.length === 0) {
    //         console.log("there is no face on a picture");

    //         // this.setErrorOnCard();
    //         // this.setState({
    //         //     resultCode: ResultCode.ERROR_NO_FACE
    //         // });
    //         // App.hideById("spinner");

    //         return;
    //     }
        
    //     console.log('here info goes --------');
    //     if (detections.length === 1) {
    //         if(this.state.algorithm === FaceRecognition.Algorithm.ADVANCED){
    //             result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
    //         }else{
    //             result = this.faceRecognitionNaive(detections[0],JSON_PROFILE_LAND);
    //         }
    //         console.log(result._label, result._distance);
    //         console.log(JSON_PROFILE_DESC[result._label]);
    //     }
    //     else {
    //         if(this.state.algorithm === Algorithm.ADVANCED){
    //             result = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
    //         }else{
    //             result = detections.map(d => this.faceRecognitionNaive(d,JSON_PROFILE_LAND));
    //         }
    //         console.log(result);
    //         console.log(JSON_PROFILE_DESC[result[0]._label]);
    //         return;
    //     }
        

    //     let outputImage = require(`../../resourсes/labeled_images/${result._label}.jpg`);
    //     let outputName = result._label.replace(/\s\d$/, '');

    //     App.hideById("spinner");
    //     App.showById("progress");
    //     Result.upload({
    //         inputSrc: URL.createObjectURL(this.state.file),
    //         outputSrc: outputImage,
    //         originalName: outputName,
    //         distance: result._distance,
    //     });
    // }

    // async findSimilarFace(detections, algorithm) {
    //     let result = null;

    //     if (detections.length === 0) {
    //         console.log("there is no face on a picture");

    //         this.setErrorOnCard();
    //         this.setState({
    //             resultCode: ResultCode.ERROR_NO_FACE
    //         });
    //         App.hideById("spinner");

    //         return;
    //     }
    //     else {
    //         console.log('here info goes --------');
    //         console.log(detections);
    //         if (detections.length === 1) {
    //             if(this.state.algorithm === Algorithm.ADVANCED){
    //                 result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
    //             }else{
    //                 result = this.faceRecognitionNaive(detections[0],JSON_PROFILE_LAND);
    //             }
    //             console.log(result._label, result._distance);
    //             console.log(JSON_PROFILE_DESC[result._label]);
    //         }
    //         else {
    //             if(this.state.algorithm === Algorithm.ADVANCED){
    //                 result = detections.map(d => this.state.faceMatcher.findBestMatch(d.descriptor));
    //             }else{
    //                 result = detections.map(d => this.faceRecognitionNaive(d,JSON_PROFILE_LAND));
    //             }
    //             console.log(result);
    //             console.log(JSON_PROFILE_DESC[result[0]._label]);
    //             return;
    //         }
    //     }

    //     let outputImage = require(`../../resourсes/labeled_images/${result._label}.jpg`);
    //     let outputName = result._label.replace(/\s\d$/, '');

    //     App.hideById("spinner");
    //     App.showById("progress");
    //     Result.upload({
    //         inputSrc: URL.createObjectURL(this.state.file),
    //         outputSrc: outputImage,
    //         originalName: outputName,
    //         distance: result._distance,
    //     });
    // }

    // async handleChange(event) {
    //     event.preventDefault();

    //     if (this.fileInputRef.current.files.length === 0) {
    //         return;
    //     }

    //     App.hideById("result");
    //     await this.setState({
    //         file: null
    //     });

    //     if (this.fileInputRef.current.files.length !== 1) {
    //         this.setErrorOnCard();
    //         this.setState({
    //             resultCode: ResultCode.ERROR_FILE_COUNT
    //         });

    //         return;
    //     }

    //     await this.setState({
    //         file: this.fileInputRef.current.files[0]
    //     });

    //     let cardUpload = document.getElementById("cardUpload");
    //     let cardHeaderUpload = document.getElementById("cardHeaderUpload");
    //     App.showById("spinner");

    //     if (Upload.fileTypes.includes(this.state.file.type)) {
    //         cardUpload.className = "card border-success";
    //         cardHeaderUpload.className = "card-header bg-success";

    //         this.setState({
    //             resultCode: ResultCode.SUCCESS
    //         }, this.faceRecognition);
    //     }
    //     else {
    //         this.setErrorOnCard();
    //         App.hideById("spinner");

    //         this.setState({
    //             resultCode: ResultCode.ERROR_FILE_TYPE
    //         });
    //     }
    // }

    // handleChangeNaive() {
    //     this.setState({
    //         algorithm: Algorithm.NAIVE
    //     }, () => {
    //         if(this.state.file) {
    //             this.faceRecognition()
    //         }
    //     });
    // }

    // handleChangeAdvanced() {
    //     this.setState({
    //         algorithm: Algorithm.ADVANCED
    //     }, () => {
    //         if(this.state.file) {
    //             this.faceRecognition()
    //         }
    //     });
    // }
//}

//export default FaceRecognition;