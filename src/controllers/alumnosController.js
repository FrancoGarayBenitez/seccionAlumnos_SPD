const bcryptjs = require('bcryptjs');
const { use } = require('../routes/alumnosRouter');
const controller = {};

controller.renderIniciarSesion = (req, res) => {
    res.render('index')
}

controller.renderRegistrarAlumno = (req, res) => {
    res.render('registrarAlumno')
}

controller.renderRegistroUsuario = (req, res) => {
    res.render('registroUsuario')
}

controller.renderObtenerAlumno = (req, res) => {
    res.render('obtenerAlumno')
}


controller.registerUser = async (req, res) => {
    const userName = req.body.userName
    const pass = req.body.passUser

    const passwordHash = await bcryptjs.hash(pass, 8);

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO empleado SET ?',{userName: userName, pass:passwordHash}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/')
            }
        })
    })
}

controller.authUser = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const passwordHash = await bcryptjs.hash(password, 8);

    if(username && password) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM empleado WHERE userName = ?', [username], async (err, result) => {
                if (result.length == 0 || !(await bcryptjs.compare(password, result[0].pass))) {
                    res.send('USUARIO Y/O PASSWORD INCORRECTOS')
                } else {
                    res.redirect('/registrarAlumno')
                }
            })
        })
    }

}




controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM alumno', (err, alumnos_list) => {
            if (err) {
                res.json(err);
            }
            res.render('listaAlumnos', {
                data: alumnos_list
            })
        })
    })
}

controller.alumnoByDni = (req, res) => {
    const data = req.body;
    let dni = data.dni

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM alumno WHERE dni = ?', [dni], (err, alumno) => {
            res.render('infoAlumno', {
                data: alumno[0]
            })
        })
    })
}

controller.save = (req, res) => {
        const registroAlumno = req.body

    let legajo = registroAlumno.legajo;
    let first_name = registroAlumno.first_name;
    let last_name = registroAlumno.last_name;
    let dni = registroAlumno.dni;
    let email = registroAlumno.email;
    let direccion = registroAlumno.direccion;
    let tel = registroAlumno.tel;
    let fechaNac = registroAlumno.fechaNac;
    let edad = registroAlumno.edad;
    let carrera = registroAlumno.carrera;
    let comision = registroAlumno.comision;

    
    let comisionElegida;
    if(comision == "Comisión A"){
        comisionElegida = 1
    } else {
        comisionElegida = 2
    }
    
    let estadoFinalElegido = 1

    let carreraElegida;
    if (carrera == "Tecnicatura en programación"){
        carreraElegida = 1
    } else if (carrera = "Ingeniería"){
        carreraElegida = 2
    } else {
        carreraElegida = 3
    }


    let registrar = "INSERT INTO alumno (idlegajo, nombre, apellido, dni, telefono, email, fechaDeNacimiento, edad, direccion, Comision_idComision, estadoFinal_idestadoFinal, Carrera_idCarrera) VALUES ('"+legajo+"', '"+first_name+"', '"+last_name+"', '"+dni+"', '"+tel+"', '"+email+"', '"+fechaNac+"', '"+edad+"', '"+direccion+"', '"+comisionElegida+"', '"+estadoFinalElegido+"', '"+carreraElegida+"')"

    req.getConnection((err, conn) => {
        conn.query(registrar, (err, alumnos_list) => {
            res.redirect('/registrarAlumno')
        })
    })
}


controller.delete = (req, res) => {
    const {id} = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM alumno WHERE idlegajo = ?', [id], (err, rows) => {
            res.redirect('/listaAlumnos')
        })
    })
}

controller.getAsistencias = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM asignaturas', (err, asignaturas) => {
            if (err) {
                res.json(err);
            }
            res.render('asistencias', {
                data: asignaturas
            })
        })
    })
}

controller.getCalificaciones = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM asignaturas', (err, asignaturas) => {
            if (err) {
                res.json(err);
            }
            res.render('calificaciones', {
                data: asignaturas
            })
        })
    })
}





module.exports = controller