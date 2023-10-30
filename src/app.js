const express = require('express')
const app = express()
const PORT = 8080
const path = require('path')
const mysql = require('mysql')
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const myConnection = require('express-myconnection')

//Importando rutas
const alumnosRouter = require('./routes/alumnosRouter')

//Settings
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "/views"))

//Middlewares
app.use("/public", express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Conexión a la base de datos
app.use(myConnection(mysql, {
    host: "localhost",
    database: "mydb",
    user: "Franco",
    password: "francoServer"
}, 'single'))

//Sesiones
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}))

//Rutas
app.use('/', alumnosRouter)

//Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})