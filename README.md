# ImageRecon
NodeJS app which consumes image recognition apis

### Installation
```
git clone git@github.com:gruberb/ImageRecon.git
npm i
```


### Usage

Currently, this app is just consuming the CloudVisionAPI from Google. I am using this [NodeJS implementation of the CloudVisionAPI](https://github.com/tejitak/node-cloud-vision-api).
To use this tool, you have to have a [GoogleVisionAPI](https://cloud.google.com/vision/) key and a [ClarifaiAPI](https://www.clarifai.com) key.

1.Set your GoogleAPI and Clarifai API key in your .bashrc or .zshrc
```
export GOOGLE_API_KEY=XXX
export CLARIFAI_ID=XXX
export CLARIFAI_SECRET=XXX
```

2.Start the app and follow the command line. 
```
node index.js
```

### Example 

#### Input image
![alt tag](https://raw.githubusercontent.com/gruberb/ImageRecon/master/assets/gate.jpg)

#### Result
![alt tag](https://raw.githubusercontent.com/gruberb/ImageRecon/master/assets/example.png)
