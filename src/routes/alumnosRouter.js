const {Router} = require ('express')
const router = Router();
const alumnosController = require('../controllers/alumnosController')

router.get('/', alumnosController.renderIniciarSesion)

router.get("/obtenerAlumno", alumnosController.renderObtenerAlumno)

router.get('/registrarAlumno', alumnosController.renderRegistrarAlumno)

router.get('/registroUsuario', alumnosController.renderRegistroUsuario)

router.post('/addUser', alumnosController.registerUser)

router.post('/auth', alumnosController.authUser)

router.post('/getAlumno', alumnosController.alumnoByDni)

router.post('/addAlumno', alumnosController.save)

router.get('/listaAlumnos', alumnosController.list)

router.get('/delete/:id', alumnosController.delete)

router.get('/asistencias', alumnosController.getAsistencias)

router.get('/calificaciones', alumnosController.getCalificaciones)






module.exports = router