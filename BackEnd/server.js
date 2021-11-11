const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
// getting-started.js
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//connect to mongodb server
const myConnectionString = 'mongodb+srv://admin:x0x0j3onsomi@cluster0.g80aw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});

//define schema to store tilte, year and poster
const Schema = mongoose.Schema;
var movieSchema = new Schema(
    {
        title:String,
        year:String,
        poster:String
    }
);

//create model
var MovieModel = mongoose.model("movie", movieSchema)


//read JSON data from the Node/Express server
//following code avoids cors error
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});


//post request to the server
app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.Title);
    console.log(req.Year);
    console.log(req.Poster);
    
    //save movie to database
    MovieModel.create({
        title:req.body.Title,
        year:req.body.Year,
        poster:req.body.Poster
    });
    //tell client data was reveived
    res.send('data recieved');
})

 app.get('/api/movies', (req,res)=>{
//     const movies = [
//         {
//         "Title":"Avengers: Infinity War",
//         "Year":"2018",
//         "imdbID":"tt4154756",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//         },
//         {
//         "Title":"Captain America: Civil War",
//         "Year":"2016",
//         "imdbID":"tt3498820",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//         },
//         {
//         "Title":"World War Z",
//         "Year":"2013",
//         "imdbID":"tt0816711",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//         },
//         {
//         "Title":"War of the Worlds",
//         "Year":"2005",
//         "imdbID":"tt0407304",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
//         }
//         ];

            MovieModel.find((err, data)=>{
                res.json(data);
            })
   })


   //get movie by id
   app.get('/api/movies/:id', (req, res)=>{
       console.log(req.params.id);

       //callback function
       MovieModel.findById(req.params.id,(err,data)=>{
           res.json(data);
       })

   })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})