const express = require('express')
const app = express()
const pg = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/books_app'

const client = new pg.Client(DATABASE_URL)

client.connect()
app.use(cors())

// app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => {console.log(`server listening on ${PORT}`)})

// client.query('SELECT * FROM books').then((result)=> {console.log(result.rows[0])})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/v1/books', (req, res) =>{
    client.query(`
    SELECT id, title, author, image_url FROM books;
    `).then(results => res.send(results.rows))
    .catch(err => console.log(err))
})

app.get('/api/v1/books/:id', (req, res) =>{
    client.query(`
    SELECT * FROM books WHERE id=${req.params.id}
    `).then(results => res.send(results.rows[0]))
    .catch(err => console.log(err))
})

app.delete('/api/v1/books/:id', (req, res) =>{
    client.query(`
    DELETE * FROM books WHERE id=${req.params.id}
    `).then(results => res.send(results.rows[0]))
    .catch(err => console.log(err))
})

app.post('/api/v1/books', express.json(), express.urlencoded({extended:true}), (req, res) =>{
    client.query(`
    INSERT INTO books
        (title, author, isbn, image_url, description)
        VALUES($1, $2, $3, $4, $5)
    `,[
        req.body.title,
        req.body.author,
        req.body.isbn,
        req.body.image_url,
        req.body.description
    ]).then(() => res.send('inserted correctly'))
    .catch(err => console.lot(err))
})


// client.query(`
//     CREATE TABLE if not exists books(
//         id serial primary key,
//         author VARCHAR(255),
//         title VARCHAR(255),
//         isbn VARCHAR(255),
//         image_url VARCHAR(255),
//         description text
//     );
// `)

// client.query(`
//     INSERT INTO books(author, title, isbn, image_url, description)
//     VALUES('author1', 'title1', 'isbn1', 'http://www.placecage.com/300/200', 'this is a book');
// `)
