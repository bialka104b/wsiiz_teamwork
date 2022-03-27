const mysql = require("mysql")

// Pool do bazy
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
})

let products = [];

// Strona glowna
exports.home = (req,res) => {
    res.render('home')
}

// Wyszukiwanie produktu
exports.find = (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log("Połączono do bazy z routa find")

        let searchPhrase = req.body.searchInput

        connection.query(`
            SELECT produkty.Id, 
            produkty.Nazwa as NazwaProduktu,
            produkty.Opis,
            produkty.Kalorie,
            produkty.kJ,
            produkty.Bialko,
            produkty.Tluszcz,
            produkty.Weglowodany,
            produkty.Blonnik,
            produkty.IG,
            produkty.Img,
            kategorie.Nazwa as NazwaKategorii FROM produkty JOIN kategorie ON produkty.Id_kategorii = kategorie.Id WHERE produkty.Nazwa LIKE ?`,
            ["%" + searchPhrase + "%"],
            (err, rows) => {
            // Jeśli udane połączenie
            connection.release()
            if (!err) {
                    products = rows;
                    console.log("productshhh", products, "productshhh");
                res.render('products', {rows})
            } else {
                console.log(err)
            }
            console.log("Znalezione dane z bazy: \n", rows);
        })
    })
}

// Lista produktów
exports.products = (req,res) => {
    // Połączenie
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log("Połączono do bazy z routa")

        // Query do bazy
        connection.query('SELECT produkty.Id, produkty.Nazwa as NazwaProduktu, produkty.Opis, produkty.Kalorie, produkty.kJ, produkty.Bialko, produkty.Tluszcz, produkty.Weglowodany, produkty.Blonnik, produkty.IG, produkty.Img, kategorie.Nazwa as NazwaKategorii FROM produkty JOIN kategorie ON produkty.Id_kategorii = kategorie.Id', (err, rows) => {
            // Jeśli udane połączenie
            connection.release()
            if(!err)
            {
                res.render('products', {rows})
            } 
            else 
            {
                console.log(err)
            }
            console.log('Znalezione dane z bazy: \n', rows)
        })
    })
}

// Pojedynczy produkt
exports.singleProduct = (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log("Połączono do bazy z routa")

        // Query
        connection.query('SELECT produkty.Id, produkty.Nazwa as NazwaProduktu, produkty.Opis, produkty.Kalorie, produkty.kJ, produkty.Bialko, produkty.Tluszcz, produkty.Weglowodany, produkty.Blonnik, produkty.IG, produkty.Img, kategorie.Nazwa as NazwaKategorii FROM produkty JOIN kategorie ON produkty.Id_kategorii = kategorie.Id WHERE id=?', [req.params.id], (err,rows) => {
            connection.release()
            if(!err)
            {
                res.render('single-product', {rows})
            }
            else
            {
                console.log(err)
            }
            console.log('Znalezione dane z bazy: \n', rows)
        })
    })
}