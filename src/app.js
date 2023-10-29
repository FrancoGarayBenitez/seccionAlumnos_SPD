const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 8080
const path = require('path')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

//Importando rutas
const alumnosRouter = require('./routes/alumnosRouter')


//Settings
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "/views"))

//Middlewares
app.use(morgan('dev'))
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



//Rutas
app.use('/', alumnosRouter)

// app.get("/registrarAlumno", (req, res) => {
//     res.render("registrarAlumno")
// })

// app.get("/", (req, res) => {
//     res.render("index")
// })

// app.get("/main", (req, res) => {
//     res.render("main")
// })

// app.get("/obtenerAlumno", (req, res) => {
//     res.render("obtenerAlumno")
// })


// app.post("/registrarAlumno", (req, res) => {
//     const registroAlumno = req.body

//     let legajo = registroAlumno.legajo;
//     let first_name = registroAlumno.first_name;
//     let last_name = registroAlumno.last_name;
//     let dni = registroAlumno.dni;
//     let email = registroAlumno.email;
//     let direccion = registroAlumno.direccion;
//     let tel = registroAlumno.tel;
//     let fechaNac = registroAlumno.fechaNac;
//     let edad = registroAlumno.edad;
//     let carrera = registroAlumno.carrera;
//     let comision = registroAlumno.comision;

    
//     let comisionElegida;
//     if(comision == "Comisión A"){
//         comisionElegida = 1
//     } else {
//         comisionElegida = 2
//     }
    
//     let estadoFinalElegido = 1

//     let carreraElegida;
//     if (carrera == "Tecnicatura en programación"){
//         carreraElegida = 1
//     } else if (carrera = "Ingeniería"){
//         carreraElegida = 2
//     } else {
//         carreraElegida = 3
//     }


//     let registrar = "INSERT INTO alumno (idlegajo, nombre, apellido, dni, telefono, email, fechaDeNacimiento, edad, direccion, Comision_idComision, estadoFinal_idestadoFinal, Carrera_idCarrera) VALUES ('"+legajo+"', '"+first_name+"', '"+last_name+"', '"+dni+"', '"+tel+"', '"+email+"', '"+fechaNac+"', '"+edad+"', '"+direccion+"', '"+comisionElegida+"', '"+estadoFinalElegido+"', '"+carreraElegida+"')"


//     conection.query(registrar, (error) => {
//         if (error) {
//             throw error
//         } else {
//             console.log("Alumno registrado correctamente.");
//         }
//     })

// })


// app.get("/alumno" , (req, res) => {
//     const alumnos = "SELECT * FROM alumno"

//     conection.query(alumnos, (error, lista) => {
//         if (error) {
//             throw error
//         } else {
//             res.json(lista);
//         }
//     })
// })

//Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})