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
      cb(null, "./uploads/Assets/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
//Server Functionality
mongoose
  .connect("mongodb+srv://MacSmith:4PZSmC7dS12T8xMi@data.vpbjhop.mongodb.net/?retryWrites=true&w=majority&appName=data")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

//create database art schema
const ArtSchema = new mongoose.Schema({
  img: String,
  title: String,
  genre: String,
  creator: String,
  year: Date
})

const Art = mongoose.model('Art', ArtSchema);


// get all
app.get("/api/Art", (req, res) => {
  getArts(res)
});

//get one
app.get("/api/Art/:id", (req, res) => {
    getArt(res, req.params.id)
});

//add a art
app.post("/api/Art", upload.single("img"), (req, res) => {
    const result = validateArt(req.body);

    if (result.error) {
        res.status(400).json({ errors: result.error.details.map(detail => detail.message) });
        return;
    }

    const art = new Art({
      title: req.body.title,
      genre: req.body.genre,
      creator: req.body.creator,
      year: req.body.year,
      img: req.file.filename
    });

    if (req.file) {
      art.img =  req.file.filename;
    }

    createArt(res, art);
});

//update a art
app.put("/api/Art/:id", upload.single("img"), (req, res) => {
      const result = validateArt(req.body);
      if (result.error) {
        res.status(400).json({ errors: result.error.details.map(detail => detail.message) });
        return;
      }
      updateArt(req,res);
});

//delete art
app.delete("/api/Art/:id", (req,res)=>{
        removeArt(res, req.params.id);
});

//app functions
const getArts = async (res) => {
    const arts = await Art.find();
    res.send(arts);
}

const getArt = async (res, id) => {
    const art = await Art.findOne({_id:id})
    res.send(art);
}

const createArt = async (res, art) => {
    const result = await art.save();
    res.send(result);
}

const updateArt = async (req,res) => {
      let updatefields ={
        title: req.body.title,
        genre: req.body.genre,
        creator: req.body.creator,
        year: req.body.year
      };
      if(req.file) {
        updatefields.img = req.file.filename;
      }
      const result = await Art.updateOne({_id: req.params.id}, updatefields);
      res.send(result);
}

const removeArt = async (res, id) => {
      const result = await Art.findByIdAndDelete(id);
      res.send(result);
}

//validation
const validateArt = (art) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    creator: Joi.allow(""),
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(2).required(),
    year: Joi.date().required(),
  });
  const result = schema.validate(art);
  return result;
};


app.listen(3000, () => {
  console.log("serving port 3000");
});