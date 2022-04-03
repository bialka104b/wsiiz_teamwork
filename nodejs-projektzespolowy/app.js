const express = require('express')
// const hbs = require('express-handlebars')
//const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')

require('dotenv').config()

// Konfiguracja middleware
const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
}))

const port = process.env.PORT || 4000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Static files
//app.use(express.static(__dirname + '/public'))

// Template engine
// app.engine('.hbs', hbs.engine({extname: '.hbs', defaultLayout: 'main'}))
// app.set('view engine', '.hbs')

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

// Import Router
const productsRouter = require('./server/routes/products.js')

// Use Routes
app.use('/api/', productsRouter)

app.listen(port, () => {
    console.log(`Nasłuch na porcie ${port}`)
})