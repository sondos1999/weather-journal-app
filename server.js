// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder

app.use(express.static('website'));

//Spin up the server

// Callback to debug

const data = [];
app.post('/add', adddata);

function adddata(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
}
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
}

/*
app.get('/all',function(request,response){response.send('projectData')});   
app.post('/all',function(request,response){response.send('projectData')})

app.post('url', (request, response) => {
        projectData.temp = request.body.temp;
    }


)
*/
//Setup Server 
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};