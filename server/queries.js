const POOL = require('pg').Pool

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'songs',
    password: 'password',
    port: 5432
})

const getSongs = (req, res) => {
    pool.query('SELECT * FROM songs ORDER BY id ASC', 
    (error, result) => {
        if(error) {
            throw error;
        }

        res.status(200).json(result.rows)
    })
}

const getSong = (req, res) => {
    const id = parseInt(req.params.id) 

    pool.query('SELECT * FROM songs WHERE id = $1',
    [id], (error, results) =>
    {if(error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
}

const createSong = (req, res) => {
    const song = req.body.song
    const artist = req.body.artist
    const album = req.body.album

    pool.query('INSERT INTO songs (song, artist, album) VALUES ($1, $2, $3) RETURNING *',
    [song, artist, album], (error, results) => {
        if(error){
            throw error
        }
        res.status(201).send(`Song added with ID: ${results.rows[0].id}`)
    })
 }

 const updateSong = (req, res) => {
    const id = parseInt(req.params.id)
    const { song, artist, album } = req.body

    pool.query(
        'UPDATE songs SET song = $1, artist = $2, album = $3 WHERE id = $4',
        [song, artist, album, id],
        (error, results) => {
            if(error) { 
                throw error
            }
            res.status(200).send(`Song modified with ID: ${id}`)
        }
    )
 }

 const deleteSong = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM songs WHERE id = $1',
    [id], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).send(`Song deleted with ID: ${id}`)
    })
}

module.exports = {
    getSongs, getSong, createSong, updateSong, deleteSong
}


