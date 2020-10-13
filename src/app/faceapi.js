import * as faceapi from 'face-api.js';

// const USE_TINY_MODEL = true;
const DISTANCE_THRESHOLD = 0.9999
const MIN_CONFIDANCE_DETECTION = 0.2
const MAX_FACES_DETECTION = 15


export const Algorithm = {
  NAIVE: 0,
  ADVANCED: 1
};

export async function faceRecognition(file, algorithm) {
  const image = await faceapi.fetchImage(file);
  let detections = await getDetections(image, (algorithm === Algorithm.ADVANCED));
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

export async function loadModels() {
  console.log('face-api create models...');
  const MODEL_URL = process.env.PUBLIC_URL + '/weights';
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  console.log('face-api loaded models!');
}

// for tests
export async function loadModelsFromDisk() {
  const MODEL_URL = './public/weights';
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

export async function createMatcher(faceProfile) {
  // Create labeled descriptors of name from profile
  console.log('face-api create faceMatcher...');
  let names = Object.keys(faceProfile);
  let labeledDescriptors = names.map(
    name => {
      let descriptors = faceProfile[name].map(descriptor => new Float32Array(Object.values(descriptor)))
      return new faceapi.LabeledFaceDescriptors(name, descriptors)
    }
  )

  // Create face matcher (maximum descriptor distance is 0.5)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    DISTANCE_THRESHOLD
  );
  console.log('faceMatcher created');
  return faceMatcher;
}

export async function getDetectionsWithLogs(image, withDescriptor = true) {
  const options = new faceapi.SsdMobilenetv1Options({
    minConfidence: MIN_CONFIDANCE_DETECTION,
    maxResults: MAX_FACES_DETECTION
  });
  let detections = null;

  console.log('face-api start detect faces...');
  if (withDescriptor) {
    detections = await faceapi.detectAllFaces(image, options)
      .withFaceLandmarks().withFaceDescriptors();
  } else {
    detections = await faceapi.detectAllFaces(image, options)
      .withFaceLandmarks();
  }
  console.log('face-api completed face detection.');
  return detections;
}

export async function getDetections(image, withDescriptor = true) {
  const options = new faceapi.SsdMobilenetv1Options({
    minConfidence: MIN_CONFIDANCE_DETECTION,
    maxResults: MAX_FACES_DETECTION
  });
  let detections = null;

  if (withDescriptor) {
    detections = await faceapi.detectAllFaces(image, options)
      .withFaceLandmarks().withFaceDescriptors();
  } else {
    detections = await faceapi.detectAllFaces(image, options)
      .withFaceLandmarks();
  }
  return detections;
}
