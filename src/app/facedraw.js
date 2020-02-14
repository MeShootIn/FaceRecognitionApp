// ********************************************************
// Imports
// ********************************************************

// ********************************************************
// Const
// ********************************************************

// ********************************************************
// Class
// ********************************************************
class FaceDraw {
  drawLandmarks(state) {
    const canvas = state.canvas;
    const imageSrc = state.imageSrc;
    const fullDesc = state.fullDesc;

    const numFacesDetected = fullDesc.length;
    if (numFacesDetected < 1) {
      console.log('No one face detected in image!');
      return;
    }

    // get face points
    const face = fullDesc[0];
    const positions = face.landmarks._positions;

    let ctx = canvas.getContext('2d');

    // draw image itself
    ctx.drawImage(imageSrc, 0, 0);

    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    let i;

    // draw lines oval
    ctx.beginPath();
    for (i = 0; i < 16; i++)
    {
      const p = positions[i];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (i = 17; i < 21; i++)
    {
      const p = positions[i];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (i = 22; i < 26; i++)
    {
      const p = positions[i];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw eye left
    const indicesEyeLeft = [36, 37, 38, 39, 40, 41, 36];
    ctx.beginPath();
    for (i = 0; i < indicesEyeLeft.length; i++)
    {
      const p = positions[indicesEyeLeft[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw eye right
    const indicesEyeRight = [42, 43, 44, 45, 46, 47, 42];
    ctx.beginPath();
    for (i = 0; i < indicesEyeRight.length; i++)
    {
      const p = positions[indicesEyeRight[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw nose
    const indicesNoseVert = [27, 28, 29, 30];
    ctx.beginPath();
    for (i = 0; i < indicesNoseVert.length; i++)
    {
      const p = positions[indicesNoseVert[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    const indicesNoseHor = [31, 32, 33, 34, 35];
    ctx.beginPath();
    for (i = 0; i < indicesNoseHor.length; i++)
    {
      const p = positions[indicesNoseHor[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw lips Up
    const indicesLipsUpU = [48, 49, 50, 51, 52, 53, 54];
    const indicesLipsUpD = [48, 60, 61, 62, 63, 64, 54];
    ctx.beginPath();
    for (i = 0; i < indicesLipsUpU.length; i++)
    {
      const p = positions[indicesLipsUpU[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();
    ctx.beginPath();
    for (i = 0; i < indicesLipsUpD.length; i++)
    {
      const p = positions[indicesLipsUpD[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw lips Dn
    const indicesLipsDnU = [48, 60, 67, 66, 65, 64, 54];
    const indicesLipsDnD = [48, 59, 58, 57, 56, 55, 54];
    ctx.beginPath();
    for (i = 0; i < indicesLipsDnU.length; i++)
    {
      const p = positions[indicesLipsDnU[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();
    ctx.beginPath();
    for (i = 0; i < indicesLipsDnD.length; i++)
    {
      const p = positions[indicesLipsDnD[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    

  } // end drawLandmarks
} // end class 
export default FaceDraw;
