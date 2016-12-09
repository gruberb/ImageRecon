const readline = require('readline');

const vision = require('node-cloud-vision-api');
const co = require('co');
const Clarifai = require('clarifai');

const {containsPeople} = require('./utils');

const exampleUrl = 'https://www.berlin.de/binaries/asset/image_assets/1719901/source/1467811317/418x316/';
const exampleLocal = './assets/gate.jpg';

vision.init({auth: process.env.GOOGLE_API_KEY});

const clarifai = new Clarifai.App(
  process.env.CLARIFAI_ID,
  process.env.CLARIFAI_SECRET
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const callVision = (url, cb) => {
  console.time('vision');
  const vis = new vision.Request({
    image: new vision.Image(url),
    features: [
      new vision.Feature('FACE_DETECTION', 10),
      new vision.Feature('LABEL_DETECTION', 10),
    ]
  });

  co(function* () {
    let res = yield vision.annotate(vis);
    return res;
  }).then((value) => {
      console.log('Time needed:');
      console.timeEnd('vision');
      console.log('');
      value.responses[0].labelAnnotations.forEach((item) => {
          console.log(item.description, item.score + ' \n');
          cb();
      });
  }, (err) => {
    console.error(err.stack);
    cb(err);
  });
};

const callClarifai = (url, cb) => {
  console.time('clarifai');
  co(function* () {
    let res = clarifai.models
        .predict(Clarifai.GENERAL_MODEL, url);
    return res;
  }).then((response) => {
    console.log('Time needed:');
    console.timeEnd('clarifai');
    console.log('');
    const people = containsPeople(response.data.outputs[0].data.concepts);
    console.log('Are there people in this photo?', people);
    cb();
  });
};


rl.question('Which service do you want to use? \n' +
  '1) GoogleVisionAPI \n' +
  '2) ClarifaiAPI \n' +
  '3) Compare the two \n', (answer) => {

    next(answer);
    // rl.close();
});

const next = (answer) => {
    switch(answer) {
    case '1':
      rl.question('You chose Google. Please provide a local url to your image: \n', (answer) => {
        callVision(answer, () => {
          rl.close();
        });
         
      });
      break;
    case '2': 
      rl.question('You chose Clarifai. Please provide a web url to your image: \n', (answer) => {
        callClarifai(answer, () => {
          rl.close();
        });
      });
      break;
    case '3': 
      console.log('We will compare both services with this picture:' + exampleUrl +'\n'); 
      callClarifai(exampleUrl, () => {
        callVision(exampleLocal, () => {
          rl.close();
        });
      });
    default:
      rl.close();
      break;
  }
}






