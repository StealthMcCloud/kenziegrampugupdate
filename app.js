const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
const app = express();
const upload = multer({ dest: uploadPath })

app.use(express.static(publicPath));
app.set("view engine", "pug")

const uploadedFiles = [];

app.get('/', function (req, res) {
  const path = './public/uploads';
  fs.readdir(path, function (err, items) {
    res.render('index', { title: 'Kenziegram With Pug', message: 'Welcome to Kenziegram With Pug', array: items })
  })
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
  uploadedFiles.push(request.file.filename);
  response.render('uploads', { title: 'Uploaded Picture With Pug', message: 'Congratulations you have clicked a button to upload a picture!!!', image: request.file.filename });
})

app.post('/latest', function (request, response, next) {
  fs.readdir(uploadPath, function (err, items) {
    let imagesArray = [];
    let highestTimeStamp = 0;
    let clientTimeStamp = request.body.after;
    for (let i = 0; i < items.length; i++) {
      let modified = fs.statSync(items[i]).mtimeMs;
      if (modified > clientTimeStamp) {
        imagesArray.push(items[i])
      }
      if (modified > highestTimeStamp) {
        highestTimeStamp = modified
      }
    }
    response.send({
      images: imagesArray,
      timestamp: highestTimeStamp
    })
  })
})

app.listen(port, () => console.log("Server running on " + port))

//use Date.now() to get initial time stamp, once we get the image data back, it needs to be manually added to the html page.  DOM methods: document.getElementById, then append it.  Then Add an ID to section in pug get to that image section. document.createElement, then document.appendChild.  Add src attribute to the img tag.  It needs to save the timestamp to the after: so it will be updated now to make sure new images are always on the top.

//These should be in the header.  Should have a method = "Post", after: number.  setInterval or setTimeOut will need to be utilized.  You will need to make sure you run the function inside the setInterval or setTimeOut so that it will re-run the function every 5 seconds.  You will run the entire post request into the fetch function.  Need to call setTimeOut within the setTimeOut function to make sure it continues to run.  You can use setInterval but it does help to run the TimeOut as you can see the execution of things.

//All these are for the server side.|| The BOSS!!!!!!!

//The timestamp represents the time the images were uploaded.  let modified = fs.statSync(imagePath).mtimeMs;  Timestamp is checking images for the timestamps.  it does not generate its own timestamps.  If it is newer then I need to send the image back under a brand new array in which everytime a new image is added.  Most of the responses are probably going to be empty arrays.  The server receives a post request.  An empty array means no new images have been received by the server.  By using the modified variable you will need to check the timestamps by using if statement.  Such as let modified = fs.statSync(imagePath).mtimeMs if(modified > after) {add to the array to send to client }.  This will need to be within a loop.  Use fs.readDir to direct where the new array will go to/be read from.  fs.readDir has a callback function and inside the callbak funtion we will do the loop.  app.post("/latest")

//for the timestamp which will be checking for the image that has the highest timestamp.  This will tell it which image is the newest time.  without using Math.max you want to use an if statement.  let maxTimeStamp = 0; for(i = 0; i < array.length; i++) {if (modified > maxTimeStap) {maxTimeStamp = modified}}  The image and timestamp issues can be resolved in the same for loop.  