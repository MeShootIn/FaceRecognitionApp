// ********************************************************
// Imports
// ********************************************************

import * as faceapi from 'face-api.js';


// ********************************************************
// Const
// ********************************************************

// const USE_TINY_MODEL = true;
const DISTANCE_THRESHOLD = 0.9999
const MIN_CONFIDANCE_DETECTION = 0.2
const MAX_FACES_DETECTION = 7

// ********************************************************
// Class
// ********************************************************

export async function loadModels() {
  console.log('face-api create models...');
  const MODEL_URL = process.env.PUBLIC_URL + '/weights';
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL); 
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  console.log('face-api loaded models!');
}

export async function createMatcher(faceProfile) {
  // Create labeled descriptors of name from profile
  console.log('face-api create faceMatcher...');
  let names = Object.keys(faceProfile);
  let labeledDescriptors = names.map(
    name => {let descriptors = faceProfile[name].map(descriptor => new Float32Array(Object.values(descriptor)))
    return new faceapi.LabeledFaceDescriptors(name,descriptors)}
  )

  // Create face matcher (maximum descriptor distance is 0.5)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    DISTANCE_THRESHOLD
  );
  console.log('faceMatcher created');
  return faceMatcher;
}

export async function getDetections(image) {
  const options = new faceapi.SsdMobilenetv1Options({ minConfidence: MIN_CONFIDANCE_DETECTION , 
    maxResults: MAX_FACES_DETECTION });
    let detections = null;
  // if(IsSingleFace){
  //   console.log('face-api start detect single face...');
  //   detections = await faceapi.detectSingleFace(image, options)
  //   .withFaceLandmarks().withFaceDescriptor();
  // }else{
  //   console.log('face-api start detect multiple faces...');
  //   detections = await faceapi.detectAllFaces(image, options)
  //   .withFaceLandmarks().withFaceDescriptors();
  // }
  console.log('face-api start detect faces...');
    detections = await faceapi.detectAllFaces(image, options)
    .withFaceLandmarks().withFaceDescriptors();
  console.log('face-api completed face detection.');    
  return detections;
}

// export function loadLabeledImages() {
//   const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
//   return Promise.all(
//     labels.map(async label => {
//       const descriptions = []
//       for (let i = 1; i <= 2; i++) {
//         const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
//         // console.log(img)
//         const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//         console.log(detections)
//         console.log(label)
//         descriptions.push(detections.descriptor)
//       }
//       return new faceapi.LabeledFaceDescriptors(label, descriptions)
//     })
//   )
// }

// export function loadFaceMatcher(labeledFaceDescriptors){
//   return new faceapi.FaceMatcher(labeledFaceDescriptors, DISTANCE_THRESHOLD)
// }


// export function loadLabeledImages(labeledImages){
//   return Promise.all(
//     labeledImages.map(async labelWithImages => {
//       const descriptions = [];
//       labelWithImages.canvases.forEach(async imgCanvas => {
//         const detections = await faceapi.detectSingleFace(imgCanvas).withFaceLandmarks().withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       });
//       return new faceapi.LabeledFaceDescriptors(labelWithImages.label, descriptions)
//     })
//   )
// }

//ORIGINAL, OLD VERSION

// export async function loadModels() {
//   console.log('face-api create models...');
//   const MODEL_URL = process.env.PUBLIC_URL + '/weights';
//   await faceapi.loadTinyFaceDetectorModel(MODEL_URL); 
//   await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
//   await faceapi.loadFaceRecognitionModel(MODEL_URL);
//   console.log('face-api loaded models!');
// }

// export async function getLandmarks(imageSrc) {
//   const wImage = imageSrc.width;
//   let scoreThreshold = 0.5;
//   const options = new faceapi.TinyFaceDetectorOptions({
//     wImage,
//     scoreThreshold
//   });
//   console.log('face-api start detect face...');
//   let fullDesc = await faceapi.detectAllFaces(imageSrc, options)
//     .withFaceLandmarks(USE_TINY_MODEL)
//     .withFaceDescriptors();
//   console.log('face-api completed face detection.');    
//   return fullDesc;
// }
