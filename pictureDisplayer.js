function pictureDisplayer(imgNames) {
    let outputString = "";
    for (let i = 0; i < imgNames.length; i++) {
      const name = imgNames[i];
      console.log(name);
      outputString += `<img src="uploads/${name}"/>`
    }
    return outputString;
  }