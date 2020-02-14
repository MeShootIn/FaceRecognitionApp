// ********************************************************
// Imports
// ********************************************************

import * as faceapi from 'face-api.js';

// ********************************************************
// Const
// ********************************************************

const USE_TINY_MODEL = true;

// ********************************************************
// Class
// ********************************************************

export async function loadModels() {
  console.log('face-api create models...');
  const MODEL_URL = process.env.PUBLIC_URL + '/weights';
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL); 
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  console.log('face-api loaded models!');
}

export async function getLandmarks(imageSrc) {
  const wImage = imageSrc.width;
  let scoreThreshold = 0.5;
  const options = new faceapi.TinyFaceDetectorOptions({
    wImage,
    scoreThreshold
  });
  console.log('face-api start detect face...');
  let fullDesc = await faceapi.detectAllFaces(imageSrc, options)
    .withFaceLandmarks(USE_TINY_MODEL)
    .withFaceDescriptors();
  console.log('face-api completed face detection.');    
  return fullDesc;
}

