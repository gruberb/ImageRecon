# ImageRecon
NodeJS app which consumes image recognition apis

### Installation
```
git clone git@github.com:gruberb/ImageRecon.git
npm i
```


### Usage

Currently, this app is just consuming the CloudVisionAPI from Google. I am using this [NodeJS implementation of the CloudVisionAPI](https://github.com/tejitak/node-cloud-vision-api).

1. Set your GoogleAPI key in your .bashrc or .zshrc
```
export GOOGLE_API_KEY=XXX
```

2. Pass the image you want to send via the command line
```
node index.js /Users/YOUR_USERNAME/folder/to/image.jpg
```

### Example 

#### Input image
![alt tag](https://raw.githubusercontent.com/gruberb/ImageRecon/master/assets/adlon.jpg)

#### Result
![alt tag](https://raw.githubusercontent.com/gruberb/ImageRecon/master/assets/ex.png)
