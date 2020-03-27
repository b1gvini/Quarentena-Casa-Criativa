// Usando express para configurar/criar servidor.
const express = require("express")
const server = express()

const db = require("./db")



// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729001.svg",
//         title: "Leia seus Livros!",
//         category: "Desenvolvimento Pessoal",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://www.google.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://www.google.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Saúde Mental",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://www.google.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729078.svg",
//         title: "Arrume seu lar!",
//         category: "Organização Pessoal",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//         url: "https://www.google.com.br"
//     }
// ]

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//Habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//configuração nunjucks            RENDER funciona porque o nunjuck direciona pra VIEWS.
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})


// rota criada
server.get("/",function(req, res){
    db.all(`SELECT * FROM IDEAS`, function(err,rows){
        if (err){
            console.log(err)
            return res.send("Erro no Banco de Dados")
        } 

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas){
            if(lastIdeas.length < 3){
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })

    
})

server.get("/ideias", function(req,res){
    db.all(`SELECT * FROM IDEAS`, function(err,rows){
        if (err){
            console.log(err)
            return res.send("Erro no Banco de Dados")
        } 
        const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", { ideas: reversedIdeas})
    })
    
})

server.post("/", function(req,res){
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no Banco de Dados")
        } 

        return res.redirect("/ideias")
    })

})
// Server On - Porta 3000
server.listen(3000)