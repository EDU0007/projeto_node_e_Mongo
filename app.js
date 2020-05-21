const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express();
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const sesseion = require('express-session')
const flash = require('connect-flash')
const usuario = require("./routes/usuario")
const blog = require("./routes/blog")
const passport = require("passport")
const {eAdmin} = require("./helpers/eAdmin")
require("./config/auth")(passport)
//configuraçoes
//session
app.use(sesseion({
    secret: "winzapappp",
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//carregando sessio
app.use((req, res, next) => {
    res.locals.sucess_msg = req.flash("sucess_msg")
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})
//bodyparser

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');
//mongose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://root:hT0ahhwfZ9QE3bfB@cluster0-7hgnw.mongodb.net/api?retryWrites=true&w=majority").then(() => {
    console.log('banco rodando')
}).catch((erro) => {
    console.log("erro ao logar no banco" + erro)
})
//public
app.use(express.static(path.join(__dirname, "public")))


app.use((req, res, next) => {
    console.log("mid...rodou")
    next()
})

//routes



app.get("/",(req, res) => {
    res.redirect("/blog")
})
app.use('/admin', admin)
app.use('/blog', blog)
app.use("/usuarios", usuario)




//outros
const PORT = 80
app.listen(PORT, () => {
    console.log('servidor rodando')
})