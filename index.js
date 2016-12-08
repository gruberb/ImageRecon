'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
vision.init({auth: GOOGLE_API_KEY});

const args = process.argv.slice(2);
console.log(args[0]);
// construct parameters
const req = new vision.Request({
  image: new vision.Image(args[0]),
  features: [
    new vision.Feature('FACE_DETECTION', 4),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

// send single request
vision.annotate(req).then((res) => {
  // handling response
  console.log(JSON.stringify(res.responses))
}, (e) => {
  console.log('Error: ', e)
})