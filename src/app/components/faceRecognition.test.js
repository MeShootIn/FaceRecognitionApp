import React from 'react';

import * as faceAPI from "../faceapi";
import * as faceapi from 'face-api.js';
import {faceRecognition, Algorithm} from './faceRecognition'

const CHARACTERS_COUNT = 10;
const CELEBRITIES_COUNT = 5;
const data = require('../../resourсes/test_faces.json');

describe('FaceRecognition tests', () => {
    // beforeAll(async () => {await faceAPI.loadModels();})

    it('Checking: you shuold find "next" in console', async () => {
        await faceAPI.loadModels();
        console.log('next');
    });

    // if first worked - it will be awesome!!!
    // it('Characters', async () => {
    //     await faceAPI.loadModels();
    //     console.log('next');
    //     const characters = data.Characters;
    //     const labels = Object.keys(characters);
    //     const filePath = (label, index) => { return `../../resourсes/labeled_images/${label} ${index}.jpg`};

    //     for (let i = 0; i < CHARACTERS_COUNT; ++i) {
    //         let detections = await faceRecognition(filePath(labels[i], 1), Algorithm.ADVANCED);

    //         if (detections.length === 0) {
    //             console.log("there is no face on a picture");
    //             continue;
    //         } else if (detections.length > 1) {
    //             console.log("too many faces");
    //             continue;
    //         }

    //         for (let j = 2; j <= characters[labels[i]]; ++j) {


    //             if(this.state.algorithm === Algorithm.ADVANCED){
    //                 result = this.state.faceMatcher.findBestMatch(detections[0].descriptor);
    //             }else{
    //                 result = this.faceRecognitionNaive(detections[0], JSON_PROFILE_LAND);
    //             }
    //         }  
    //     }
    //     // const image = faceapi.fetchImage(`../../resourсes/labeled_images/${arr[0]} 1.jpg`);

    //     // console.log(`../../resourсes/labeled_images/${arr[0]} 1.jpg`);
    //     // console.log(image);

    //     // let detections = faceAPI.getDetections(image);
    //     // let detections = await faceRecognition(file, Algorithm.ADVANCED);
    //     // console.log(detections);
    //     // console.log(detections[0]);

        
    // });

    // it('Celebrities', () => {
    //     const celebrities = data.Celebrities;
    //     const arr = Object.keys(celebrities);

    //     for (let i = 0; i < CELEBRITIES_COUNT; ++i) {
    //         console.log(arr[i] + " -> " + celebrities[arr[i]]);
    //     }
    // })
});