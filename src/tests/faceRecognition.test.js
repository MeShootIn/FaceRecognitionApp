// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';

import * as fetch from 'node-fetch';
import * as faceapi from 'face-api.js';
import * as faceAPI from '../app/faceapi';
import { EuclideanDistance } from '../app/faceRecognition'


// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ fetch, Canvas, Image, ImageData })


// import fetch from 'node-fetch'
// import * as faceAPI from "../app/faceapi";

const data = require('./test_faces.json');

describe('FaceRecognition tests', () => {
    beforeAll(async () => {
		await faceAPI.loadModelsFromDisk();
		console.log('Models are loaded');
	});
	
	for (let label of Object.keys(data.persons)) {
		console.log(label);
		it(`${label}:`, async () => {
			await doTest(label);
		});
	}
});

async function doTest(label) {
	let image = await canvas.loadImage(__dirname + `\\${data.folder}\\${label} 1.jpg`);
	// console.log(image);

	let detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
	let detectionsOther;
	// console.log(detections[0]);

	if (detections.length === 1) {
		for (let j = 2; j <= data.persons[label]; ++j) {
			image = await canvas.loadImage(__dirname + `\\${data.folder}\\${label} ${j}.jpg`);
			detectionsOther = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

			if (detectionsOther.length === 1) {
				const dist = EuclideanDistance(detections[0].descriptor, detectionsOther[0].descriptor);
				expect(dist < 0.65).toBe(true);
				console.log(`${label}: ${1} <-> ${j}. dist=${dist}`); // < 0.63-0.65
			} else {
				console.log(`Image (${label} ${j}) must contains only 1 face`);
				continue;
			}
		}
	} else {
		console.log(`Image (${label} 1) must contains only 1 face`);
	}
}