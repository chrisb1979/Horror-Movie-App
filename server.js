// Express server
const express = require('express');
const path = require('path');
const app = express()

// Specify static route to home directory
app.use(express.static(__dirname));

// Setup home route to send index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// Setup route to movie info page
app.get('/:id', (req, res) => {
    res.sendFile(__dirname + '/about.html');
})

// Setup route to contact page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
})

// Show message if route is invalid
app.use((req, res) => {
    res.json("404 Not Found");
})

// Local port where app will display (localhost:3000)
app.listen(3000, () => {
    console.log('Express Server is listening on port 3000...')
})