var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

var models = require("./models")
mongoose.connection.openUri('mongodb://localhost/demo', function () {
    console.log("conectado a la base de datos")
})
// get libros
app.get('/libros', function (req, res) {
   models.find({})
   .exec()
   .then((book) => {
    res.json(book);
   })
   .catch((error) => {
       res.send("no hay libros")
   })
});

// get 1 libro

app.get('/libros/:id', function (req, res) {
   models.findOne({_id:req.params.id}, function(err, books) {
       if(err){
           res.json({message:"no encontro libros"})
       } else {
           res.json(books);
       }
   })
});
// crear libros

app.post("/new", function(req, res) {
    var item = {
        title: req.body.title,
        genero: req.body.genero,
        author: req.body.author
    }
    
    var nuevo = new models(item);
    nuevo.save(function(err) {
        if (err) {
          
    res.json({ success: false }); 
        } else {
            console.log('libro saved successfully');
         res.json({ success: true });
        }
    });
    

});

// actualizar 

app.put('/libros/:id', function (req, res) {
   models.findOneAndUpdate({_id:req.params.id},{$set:{title: req.body.title}}, function(err, book) {
       if(err){
           res.json({message:"no encontro libros"})
       } else {
           res.json(book);
       }
   })
});

// delete

app.delete('/libros/:id', function (req, res) {
   models.findOneAndRemove({_id:req.params.id}, function(err, book) {
       if(err){
           res.json({message:"no encontro libro para borrar"})
       } else {
           res.json(book);
       }
   })
});

app.listen(3000);