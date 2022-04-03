const mysql = require("mysql")

// Pool do bazy
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
})

// Strona glowna
exports.home = async (req,res) => {
    try{
        res.json({ message: 'Strona domowa'})
    }catch(e){
        console.log(e)
        res.status(404).json({ message: 'Error'})
    }
}

// Lista produktów
exports.products = async (req,res) => {
    try{
        // Połączenie
        pool.getConnection((err,connection) => {
            if(err) throw err
            console.log("Połączono do bazy z routa")

            // Query do bazy
            connection.query(`SELECT produkty.id, 
                produkty.nazwa as nazwa, 
                produkty.opis, 
                produkty.kalorie, 
                produkty.kj, 
                produkty.bialko, 
                produkty.tluszcz, 
                produkty.weglowodany, 
                produkty.blonnik, 
                produkty.ig, 
                produkty.img, 
                kategorie.nazwa as kategoria 
                FROM produkty 
                JOIN kategorie 
                ON produkty.id_kategorii = kategorie.id`, 
                (err, rows) => {
                    // Jeśli udane połączenie
                    connection.release()
                    if(!err)
                    {
                        res.status(200).json({
                            count: rows.length,
                            products: rows
                        })
                    } 
                    else 
                    {
                        res.json({ message: 'Nie znaleziono produktów'})
                    }
                //console.log('Znalezione dane z bazy: \n', rows)
            })
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: 'Error'})
    }
}

// Wyszukiwanie produktu
exports.find = async (req,res) => {
    try{
        pool.getConnection((err,connection) => {
            if(err) throw err
            console.log("Połączono do bazy z routa find")
    
            let searchPhrase = req.body.searchInput
            if(searchPhrase.length >= 2){
                connection.query(`SELECT produkty.id, 
                    produkty.nazwa as nazwa, 
                    produkty.opis, 
                    produkty.kalorie, 
                    produkty.kj, 
                    produkty.bialko, 
                    produkty.tluszcz, 
                    produkty.weglowodany, 
                    produkty.blonnik, 
                    produkty.iG, 
                    produkty.img,
                    kategorie.nazwa as kategoria 
                    FROM produkty 
                    JOIN kategorie 
                    ON produkty.id_kategorii = kategorie.id 
                    WHERE produkty.nazwa LIKE ?`, ["%" + searchPhrase + "%"], 
                    (err,rows) => {
                        // Jeśli udane połączenie
                        connection.release()
                        if(!err)
                        {
                            res.status(200).json({
                                count: rows.length,
                                products: rows
                            })
                        }
                        else
                        {
                            console.log(err)
                        }
                    //console.log("Znalezione dane z bazy: \n", rows);
                })
            }else{
                res.json({message: 'Nazwa szukanego produktu jest za krótka'})
            }
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: 'Error'})
    }
}

// Pojedynczy produkt
exports.singleProduct = async (req,res) => {
    try{
        pool.getConnection((err,connection) => {
            if(err) throw err
            console.log("Połączono do bazy z routa")
    
            // Query
            connection.query(`SELECT produkty.id, 
                produkty.nazwa as nazwa, 
                produkty.opis, 
                produkty.kalorie, 
                produkty.kj, 
                produkty.bialko, 
                produkty.tluszcz, 
                produkty.weglowodany, 
                produkty.blonnik, 
                produkty.ig, 
                produkty.img, 
                kategorie.nazwa as kategoria 
                FROM produkty 
                JOIN kategorie 
                ON produkty.id_kategorii = kategorie.id 
                WHERE produkty.id=?`, [req.params.id], 
                (err,rows) => {
                    connection.release()
                    if(!err && rows.length > 0)
                    {
                        res.status(200).json({products: rows})
                    }
                    else
                    {
                        res.json({message: 'Nie znaleziono tego produktu'})
                    }
                //console.log('Znalezione dane z bazy dla pojedycznego produktu: \n', rows)
            })
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: 'Error'})
    }
}

// Lista kategorii
exports.categories = async (req, res) => {
    try{
        pool.getConnection((err,connection) => {
            if(err) throw err
            console.log("Połączono do bazy z routa listy kategorii")

            // Query
            connection.query(`SELECT kategorie.id,
                kategorie.nazwa
                FROM kategorie`, 
                (err, rows) => {
                    connection.release()
                    if(!err){
                        res.status(200).json({
                            count: rows.length,
                            categories: rows
                        })
                    }else{
                        console.log(err)
                    }
                //console.log("Znalezione dane z bazy: \n", rows);
            })
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: 'Error'}) 
    }
}

// Wszystkie produkty z danej kategorii
exports.category = async (req, res) => {
    try{
        pool.getConnection((err,connection) => {
            if(err) throw err
            console.log("Połączono do bazy z routa kategorii")
            
            let categoryName = req.params.category

            // Query
            connection.query(`SELECT produkty.id, 
                produkty.nazwa as nazwa, 
                produkty.opis, 
                produkty.kalorie, 
                produkty.kj, 
                produkty.bialko, 
                produkty.tluszcz, 
                produkty.weglowodany, 
                produkty.blonnik, 
                produkty.ig, 
                produkty.img, 
                kategorie.nazwa as kategoria 
                FROM produkty 
                JOIN kategorie 
                ON produkty.id_kategorii = kategorie.id 
                WHERE kategorie.nazwa LIKE ?`, ["%" + categoryName + "%"], 
                (err,rows) => {
                    // Jeśli udane połączenie
                    connection.release()
                    if(!err)
                    {
                        res.status(200).json({
                            count: rows.length,
                            products: rows
                        })
                    }
                    else
                    {
                        console.log(err)
                    }
                //console.log("Znalezione dane z bazy: \n", rows);
            })
        })
    }catch(e){
        console.log(e)
        res.status(404).json({message: 'Error'}) 
    }
}