const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./Quarentena-Casa-Criativa.db')

db.serialize(function () {
    // CRIANDO A TABELA
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
// COMENTÁRIOS PARA APRENDIZADO
    // // INSERINDO NA TABELA
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729001.svg",
    //     "Leia seus Livros!",
    //     "Desenvolvimento Pessoal",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //     "https://www.google.com.br"
    // ]
    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    // DELETE CORRETO
    // db.run(`DELETE FROM ideas WHERE id = ?`, [3], function(err){
    //     if (err) return console.log(err)

    //     console.log("DELETEI", this)
    // })
    
    // DELETE INSANO E TALVEZ ERRADO
    // db.run(`DELETE FROM ideas `, function(err){
    //     if (err) return console.log(err)

    //     console.log("DELETEI", this)
    // })

    //CONSUlTAR DADOS
    // db.all(`SELECT * FROM IDEAS`, function(err,rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

})

module.exports = db