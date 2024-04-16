const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

//create multer storage and file filter function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/Assets/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

mongoose
  .connect("mongodb+srv://MacSmith:4PZSmC7dS12T8xMi@data.vpbjhop.mongodb.net/?retryWrites=true&w=majority&appName=data")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));



const ArtSchema = new mongoose.Schema({
  title: String,
  description: String,
  artist: String,
  year: Date
})

const Art = mongoose.model('Art', ArtSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})




app.listen(3000, () => {
  console.log("serving port 3000");
});