const express = require("express");

const bodyParser = require('body-parser');

const path = require('path');

const PORT = 8001;

const app = express();

const db = require('./queries');

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../favlinks/build", "index.html"))

})

app.get('/links', db.getLinks)

app.get('/links/:id', db.getLink)

app.post('/new', db.createLink)

app.put('links/:id', db.updateLink)

app.delete('/links/:id', db.deleteLink)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

