# Face Recognition App

## Description

This application recognizes one or more faces in a photo, calculating 68 characteristic points for each person and comparing it with the most similar celebrity.

## Requirements

* Node.js
* npm package manager
* browser and a photo

## Demo App

http://seriesface.herokuapp.com

## Command interface

To install all packages from `package.json`:
```
npm install
```
To start web application:
```
npm run start
```
To build web application:
```
npm run build
```
To run tests:
```
npm run test
```

## Testing

If you want to test new celebrities, add their images to the `src/tests/test_faces` folder and add their characteristics to the `src/tests/test_faces.json` file.

## Useful links

[face-api.js](https://github.com/justadudewhohacks/face-api.js) library

[React.js](https://reactjs.org/) docs

### Group members

* Dmitrii Mishutin (face recognition + UI)
* Dmitrii Kamianskii (face recognition)
* Dmitrii Kondratev (tests)