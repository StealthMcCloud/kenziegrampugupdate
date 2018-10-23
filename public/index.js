let mostRecentTimestamp = Date.now();
let imageInfo = {
  clientTimestamp: Date.now(),
  image: uploadedFiles
};

let imagesArray = [];


function updateClient() {
    fetch(photoPath, {
      method: POST,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'after': 'timestamp'})
    })
    .then(response => response.json())
    .then(serverResponse => {
      imageData
    })
  }
  setTimeout(clientPost, 5000)