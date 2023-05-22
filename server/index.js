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
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
})

app.get('/songs', db.getSongs)

app.get('/songs/:id', db.getSong)

app.post('/new', db.createSong)

app.put('songs/:id', db.updateSong)

app.delete('/songs/:id', db.deleteSong)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

