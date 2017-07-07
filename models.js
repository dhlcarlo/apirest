var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var libro = new Schema({
    title: String,
    genero:String,
    fecha: {
        type:Date,
        default: Date.now,
        author: String
    }
});

module.exports = mongoose.model('libro', libro);