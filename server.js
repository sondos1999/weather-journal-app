// Setup empty JS object to act as endpoint for all routes
projectData = {};

// define express to run server and routes
const express = require('express');
// inctance from express
const app = express();
//include cors
const cors = require('cors');
app.use(cors());

// include bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//local server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};


// Initialize the main project folder

app.use(express.static('website'));
//get route
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
}
//post route

app.post('/add', adddata);

function adddata(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);

}
