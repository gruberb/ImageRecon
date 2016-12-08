'use strict'
const vision = require('node-cloud-vision-api');
const co = require('co');

// init with auth
vision.init({auth: process.env.GOOGLE_API_KEY});

const args = process.argv.slice(2);
// construct parameters
const req = new vision.Request({
  image: new vision.Image(args[0]),
  features: [
    new vision.Feature('FACE_DETECTION', 4),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
});

co(function* () {
  let res = yield vision.annotate(req);
  return res;
}).then(function (value) {
    console.log(value);
    value.responses[0].labelAnnotations.forEach((item) => {
        console.log(item.description, item.score + ' \n');
    });
}, function (err) {
  console.error(err.stack);
});

