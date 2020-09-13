const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//config api routes
const scores = require('./routes/api/scores');

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());


//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db, {useUnifiedTopology: true,
        useNewUrlParser: true})
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/scores', scores);

const port = process.env.port || 5000;

app.listen(port, () => console.log('Server started on port ' + port));