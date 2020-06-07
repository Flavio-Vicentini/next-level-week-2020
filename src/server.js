const express = require ("express")
const server = express()

// importar db
const db = require ("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({extended:true}))


// utilizando template engine
const nunjucks = require ("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})




//configurar caminhos da aplicacao
//req - requisiao
//res - response
server.get ("/", (req,res) => {
    return res.render("index.html")
})
server.get ("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{

    //req.body - corpo do formulario
    //inserir dados no db
        const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?); 
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens    
    ]
    console.log(req.address)
    console.log(req.address2)

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render ("create-point.html",{saved:true})
    }

    db.run(query, values, afterInsertData)
})



server.get ("/search", (req,res) => {

        const search = req.query.search

        if (search == ""){
            return res.render("search-results.html", {total:0}) 
        }

    // buscar os dados no db
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar html com os dados do db
        return res.render("search-results.html", {places:rows,total:total})
    })

})


//ligar o servidor
server.listen(3000)