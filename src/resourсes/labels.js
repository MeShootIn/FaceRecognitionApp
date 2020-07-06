// import { canvas} from './commons/env';
// import * as faceapi from 'face-api.js';

export let labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark'];

// export function getLabeledImages(labels){
//   return Promise.all(
//     labels.map(async label => {
//       const imagesForLabel = []
//       const canvasForLabel = []
//       for(let j = 1; j <= NUMBER_OF_PICTURES_FOR_LABEL; j++){
//           imagesForLabel.push(`../../resourсes/labeled_images/${label}/${j}.jpg`)
//           // const imgCanvas = await canvas.loadImage(`/labeled_images/${label}/${j}.jpg`)
//           const imgCanvas = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${j}.jpg`)
//           canvasForLabel.push(imgCanvas)
//       }
//       return {label: label,
//         images: imagesForLabel,
//         canvases: canvasForLabel,
//         presentation: imagesForLabel[0]
//         }
//     })
//   )  
// }

 