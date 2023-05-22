const POOL = require('pg').Pool

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
})

const getLinks = (req, res) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', 
    (error, result) => {
        if(error) {
            throw error;
        }

        res.status(200).json(result.rows)
    })
}

const getLink = (req, res) => {
    const id = parseInt(req.params.id) 

    pool.query('SELECT * FROM links WHERE id = $1',
    [id], (error, results) =>
    {if(error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
}

const createLink = (req, res) => {
    const name = req.body.name
    const URL = req.body.URL

    pool.query('INSERT INTO links (name, URL) VALUES ($1, $2) RETURNING *',
    [name, URL], (error, results) => {
        if(error){
            throw error
        }
        res.status(201).send(`Link added with ID: ${results.rows[0].id}`)
    })
 }

 const updateLink = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, URL } = req.body

    pool.query(
        'UPDATE links SET name = $1, URL = $2 WHERE id = $3',
        [name, URL, id],
        (error, results) => {
            if(error) { 
                throw error
            }
            res.status(200).send(`Link modified with ID: ${id}`)
        }
    )
 }

 const deleteLink = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM links WHERE id = $1',
    [id], (error, results) => {
        if(error){
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getLinks, getLink, createLink, updateLink, deleteLink
}


