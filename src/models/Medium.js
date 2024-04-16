const mongoose = require('mongoose');
const ArtSchema = new mongoose.Schema({
    title: String,
    description: String,
    artist: String,
    year: Date
})

const Art = mongoose.model('Art', ArtSchema);