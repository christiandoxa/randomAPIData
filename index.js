const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/index');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(route);

app.listen(8839, () => {
    console.log('App is running on port 8839!');
});