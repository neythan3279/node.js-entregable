const { Router } = require('express');
const router = Router();
// require('./helpers/helper');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/eliminar', (req, res) => {
    res.render('eliminar');
});

router.get('/CursoCAdmin', (req, res) => {
    res.render('crearCurso');
});

router.post('/CursoCAdmin', (req, res) => {
    res.render('cursoListo', {
        curso: {
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            ccProfe: req.body.ccProfe,
            profe: req.body.profe,
            desc: req.body.desc,
            modalidad: req.body.modalidad,
            estado: req.body.estado,
            duracion: req.body.duracion,
            costo: req.body.costo
        }
    });
});

router.get('/listarCA', (req, res) => {
    res.render('listaCursos');
});

router.get('/eliminarCurso:id', (req, res) => {
    const id = req.params.id;
    res.render('eliminarCurso', {
        codigo: id,
    });
});

router.get('/EliminarEstudiante:id', (req, res) => {
    const id = req.params.id;
    res.render('eliminarEstudiante', {
        cc: id,
    });
})

router.get('/registro', (req, res) => {
    res.render('registro');
});

router.post('/actualizarEstado:id', (req, res) => {
    const id = req.params.id;
    res.render('actualizarEstado', {
        codigo: id,
    });
});

router.post('/actualizarModalidad:id', (req, res) => {
    const id = req.params.id;
    res.render('actualizarModalidad', {
        codigo: id,
    });
});

router.post('/registro', (req, res) => {
    res.render('existe', {
        user: {
            nombre: req.body.nombre,
            rol: req.body.rol,
            cc: req.body.cc,
            tel: req.body.tel,
            correo: req.body.correo,
            asignatura: req.body.asignatura
        }
    });
});

router.post('/login', (req, res) => {
    res.render('login', {
        datos: {
            nombre: req.body.nombre,
            cedula: parseInt(req.body.password)
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/cursos', (req, res) => {
    res.render('cursos');
});

module.exports = router;