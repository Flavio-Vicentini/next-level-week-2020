//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()
//criar objeto
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto

db.serialize(() => {
    //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            itens TEXT
        );
    `)

//     //Inserir dados
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             itens
//         ) VALUES (?,?,?,?,?,?,?); 
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme GEmballa, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papeis e Papelao"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     //Consultar os dados

//     db.all(`SELECT * FROM places`, function (err, rows) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Aqui estao seus registros")
//         console.log(rows)

//     })


    // // Deleta dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`,[11],function(err){
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Deletado com sucesso")
    // })


})


