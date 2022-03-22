const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config()

// Konfiguracja middleware
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Static files
app.use(express.static(__dirname + '/public'))

// Template engine
app.engine('.hbs', hbs.engine({extname: '.hbs', defaultLayout: 'main'}))
app.set('view engine', '.hbs')

// Połączenie do bazy
const pool = mysql.createPool({
    connectionLimit : 10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME
})

pool.getConnection((err,connection) => {
    if(err) {
        console.log("Niudane połączenie do bazy")
        throw err
    }
    console.log('Podłączono do bazy "' + process.env.DB_NAME + '"')
})

// Router
app.use('/', require('./server/routes/products.js'))

app.listen(port, () => {
    console.log(`Nasłuch na porcie ${port}`)
})