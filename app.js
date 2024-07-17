/**
 * This file is a express server serving static assets.
 * THIS SERVER IS NOT MEANT TO BE USED IN DEVELOPMENT.
 * In production this server will serve static index.html
 */
/* eslint-disable */
var express = require('express');
var helmet = require('helmet');
var app = express();
var compression = require('compression');
var path = require('path');


// compress all responses
app.use(compression());
/* app.use(helmet({
    frameguard: {
        action: 'deny'
    }
})); */

app.use('/', express.static('build'));

// Always return the main index.html, so react-router render the route in the
// client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT ? process.env.PORT : 80, function () {
    console.log('Frontend Listing on ',process.env.PORT ? process.env.PORT : 80);
});

