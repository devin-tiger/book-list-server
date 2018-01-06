const express = require('express')
const app = express()
const pg = require('pg')
const bodyParser = require('body-parser')

// let __API_URL__ = "http://localhost:3000"
// let __API_URL__ = "https://dc-th-booklist.herokuapp.com"

const PORT = process.env.PORT || 3000

// const conString = 'postgres://postgres:1234@localhost:5432/doggoes'

// const client = new pg.Client(conString)

// client.connect()

app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => {console.log(`server listening on ${PORT}`)})

// client.query('SELECT * FROM books').then((result)=> {console.log(result.rows[0])})

app.use(bodyParser.urlencoded({extended:true}))

