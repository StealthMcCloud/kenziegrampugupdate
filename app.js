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
app.use(express.json())

const uploadedFiles = [];

app.get('/', function (req, res) {
  const path = './public/uploads';
  fs.readdir(path, function (err, items) {
    items.splice(items.findIndex(imgName => imgName === ".DS_Store"), 1);
    res.render("index", { items });
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
      let modified = fs.statSync("./public/uploads/" + items[i]).mtimeMs;
      if (modified > clientTimeStamp) {
        imagesArray.push("/uploads/" + items[i])
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

//Look into fs.readdir to see if you can sort it with this.