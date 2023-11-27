
const express = require('express');
const path = require('path');
const app = express()


app.use(express.static(__dirname));

e
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/:id', (req, res) => {
    res.sendFile(__dirname + '/about.html');
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
})


app.use((req, res) => {
    res.json("404 Not Found");
})


app.listen(3000, () => {
    console.log('Express Server is listening on port 3000...')
})