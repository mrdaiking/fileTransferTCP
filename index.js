const express = require("express"); //Import the express dependency
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express(); //Instantiate an express app, the main work horse of this server

//add other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8000; //Save the port number where your server will be listening

app.post("/upload_files", uploadFiles);
function uploadFiles(req, res) {
  console.log(req.body);
}

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.get("/download", function (req, res) {
  const file = `${__dirname}/upload-folder/register-debug.apk`;
  res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});