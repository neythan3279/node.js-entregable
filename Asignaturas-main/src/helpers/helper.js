const hbs = require('hbs');
const fs = require('fs');
const express = require('express');
const app = express();


usuariosRegistro = [];
cursosRegistro = [];

hbs.registerHelper('crear', (user) => {
    cargarData();
    let User = {
        nombre: user.nombre,
        rol: user.rol,
        cc: user.cc,
        tel: user.tel,
        correo: user.correo,
        asignatura: user.asignatura
    };
    let duplicado = usuariosRegistro.find(nom => nom.cc == User.cc);
    console.log("Existe: ", duplicado);
    if (!duplicado && User.nombre) {
        usuariosRegistro.push(User);
        console.log("Duplica: ", usuariosRegistro);
        save();
        return (" ha sido registrado exitosamente. ")
    } else {
        return ('no pudo ser registrado. Ya existe otro estudiante registrado con esa cédula');
    }

});

hbs.registerHelper('listaEstudiantesCurso', () => {
    cargarDataCurso();
    cargarData();
    let texto = "";
    cursosRegistro.forEach(curso => {
        texto += "<table border='2' class='table table-bordered'>\
                    <thead>\
                    <tr class ='table-primary'>\
                    <th colspan='2'>Curso: " + curso.nombre + "</th>\
                    <th colspan='3'>Codigo: " + curso.codigo + "</th>\
                    </tr>\
                    <tr>\
                    <th>Estudiante</th>\
                    <th>Documento</th>\
                    <th>Télefono</th>\
                    <th>Correo</th>\
                    <th></th>\
                    <tr>\
                    </thead>\
                    <tbody>";
        usuariosRegistro.forEach(user => {
            if (user.asignatura == curso.codigo) {
                texto = texto +
                    '<tr class= "">' +
                    '<td>' + user.nombre + '</td>' +
                    '<td>' + user.cc + '</td>' +
                    '<td>' + user.tel + '</td>' +
                    '<td>' + user.correo + '</td>' +
                    '<td>' +
                    '<div class="mt-1">' +
                    '<a href="/EliminarEstudiante' + user.cc + '" class="btn btn-lg btn-primary btn-block bg-danger">Eliminar</a>' +
                    ' </div>' +
                    '</td> </tr>';
            }
        });

        texto += '</tbody></table>';
    });
    return texto;
});


hbs.registerHelper('eliminarEstudiantesCurso', (cc) => {
    cargarData();
    console.log("CC: ", cc);
    let insc = usuariosRegistro.filter(estudiante => estudiante.cc != cc);
    console.log("Data nueva: ", insc);

    if (insc.length == usuariosRegistro.length) {
        console.log('La cedula del estudiantes no se ha encontrado');
        return "La cedula del estudiantes no se ha encontrado";
    } else {
        console.log("Data nueva: ", insc);
        usuariosRegistro = insc;
        save();
        return ('Usted ha eliminado el estudiante del curso seleccionado.');
    };

});



hbs.registerHelper('actualizar', (codigo) => {
    cargarDataCurso();
    var propiedad = codigo
    let duplicado = cursosRegistro.find(curso => curso.codigo == codigo)
    if (!duplicado) {
        return (" El curso no existe. ");
    } else {
        console.log(duplicado);
        let ilimin = cursosRegistro.filter(actualizarCurso => actualizarCurso.codigo != codigo)
        if (ilimin.length == cursosRegistro.length) {
            console.log('El codigo del curso no se ha encontrado');
        } else {
            cursosRegistro = ilimin;
            let sw = "Disponible";

            if (duplicado.estado == "Disponible") {
                sw = "No disponible";
            }

            let data = {
                nombre: duplicado.nombre,
                codigo: duplicado.codigo,
                ccProfe: duplicado.ccProfe,
                profe: duplicado.profe,
                desc: duplicado.desc,
                modalidad: duplicado.modalidad,
                estado: sw,
                duracion: duplicado.duracion,
                costo: duplicado.costo
            }
            cursosRegistro.push(data);
            guardarCursos();
            return ('Se ha modificado correctamente el estado del curso: ' + data.nombre);
        };


    }
});

hbs.registerHelper('actualizarModo', (codigo) => {
    cargarDataCurso();
    let duplicado = cursosRegistro.find(curso => curso.codigo == codigo)
    if (!duplicado) {
        return (" El curso no existe. ");
    } else {
        console.log(duplicado);
        let ilimin = cursosRegistro.filter(actualizarCurso => actualizarCurso.codigo != codigo)
        if (ilimin.length == cursosRegistro.length) {
            console.log('El codigo del curso no se ha encontrado');
        } else {
            cursosRegistro = ilimin;
            let sw = "Virtual";

            if (duplicado.modalidad == "Virtual") {
                sw = "Presencial";
            }

            let data = {
                nombre: duplicado.nombre,
                codigo: duplicado.codigo,
                ccProfe: duplicado.ccProfe,
                profe: duplicado.profe,
                desc: duplicado.desc,
                modalidad: sw,
                estado: duplicado.estado,
                duracion: duplicado.duracion,
                costo: duplicado.costo
            }
            console.log(data)
            cursosRegistro.push(data);
            guardarCursos();
            r = "El curso " + data.nombre + " ha cambiado de modalidad Corectamente.";
            return (r);
        };


    }
});

hbs.registerHelper('crearCurso', (curso) => {
    cargarDataCurso();
    let Curso = {
        nombre: curso.nombre,
        codigo: curso.codigo,
        ccProfe: curso.ccProfe,
        profe: curso.profe,
        desc: curso.desc,
        modalidad: curso.modalidad,
        estado: curso.estado,
        duracion: curso.duracion,
        costo: curso.costo
    };
    let duplicado = cursosRegistro.find(ofCurso => ofCurso.codigo == Curso.codigo);
    console.log("Existe: ", duplicado);
    if (!duplicado && Curso.nombre) {
        cursosRegistro.push(Curso);
        console.log("Cursos Listos: ", cursosRegistro);
        console.log("Nuevos:", Curso);
        guardarCursos();
        return (" ha sido registrado exitosamente. ")
    } else {
        return ('no pudo ser registrado. Ya existe otro curso registrado con el mismo codigo');
    }

});

hbs.registerHelper('listaCursos', () => {
    cargarDataCurso();
    let texto = "<table border='2' class='table table-bordered'>\
                <thead>\
                <th>Curso</th>\
                <th>Codigo</th>\
                <th>Docente</th>\
                <th>CC Docente</th>\
                <th>Descripcion</th>\
                <th>Modalidad</th>\
                <th>Valor</th>\
                <th>Duracion</th>\
                <th>Estado</th>\
                <th></th>\
                </thead>\
                <tbody>";

    cursosRegistro.forEach(curso => {
        texto = texto +
            '<tr class= "">' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.codigo + '</td>' +
            '<td>' + curso.profe + '</td>' +
            '<td>' + curso.ccProfe + '</td>' +
            '<td>' + curso.desc + '</td>' +
            '<td> <form action="/actualizarModalidad' + curso.codigo + ' " method="post"><button type="submit " name="cambio " value="">' + curso.modalidad + '</button></form></td>' +
            '<td>' + curso.costo + '</td>' +
            '<td>' + curso.duracion + '</td>' +
            '<td> <form action="/actualizarEstado' + curso.codigo + '" method="post"><button type="submit " name="cambio " value="">' + curso.estado + '</button></form></td>' +
            '<td>' +
            '<div class="mt-1">' +
            '<a href="/EliminarCurso' + curso.codigo + '" class="btn btn-lg btn-primary btn-block bg-danger">Eliminar</a>' +
            ' </div>' +
            '</td> </tr>';
    })
    texto = texto + '</tbody></table>';
    return texto;
});


hbs.registerHelper('cargaCursos', () => {
    cargarDataCurso();
    let estado = cursosRegistro.filter(eCurso => eCurso.estado == 'Disponible');
    console.log(estado)
    let texto = " <select required='required' name='asignatura' placeholder='Seleciona un curso' class='form-control'>";

    estado.forEach(curso => {
        texto = texto +
            '<option value="' + curso.codigo + '">' + curso.nombre + '</option>';
    })
    texto = texto + '</select>';
    return texto;
});


hbs.registerHelper('listarCursosAspirante', () => {
    cargarDataCurso();
    let texto = "<table border='2' class='table'>\
                <thead>\
                <th>Curso</th>\
                <th>Codigo</th>\
                <th>Modalidad</th>\
                <th>Valor</th>\
                <th>Duracion</th>\
                <th>Estado</th>\
                </thead>\
                <tbody>";

    cursosRegistro.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.codigo + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.costo + '</td>' +
            '<td>' + curso.duracion + '</td>' +
            '<td>' + curso.estado + '</td></tr>';
    })
    texto = texto + '</tbody></table>';
    return texto;
});

hbs.registerHelper('eliminarCurso', (codigo) => {
    cargarDataCurso();
    let insc = cursosRegistro.filter(eCurso => eCurso.codigo != codigo);
    console.log("Data nueva: ", insc);

    if (insc.length == cursosRegistro.length) {
        console.log('El codigo del curso no se ha encontrado');
    } else {
        console.log("Data nueva: ", insc);
        cursosRegistro = insc;
        guardarCursos();
        return ('Usted ha eliminado el curso seleccionado.');
    };

});

const cargarData = () => {
    try {
        usuariosRegistro = require('../../usuarios.json');
    } catch (error) {
        usuariosRegistro = [];
    }
}

const cargarDataCurso = () => {
    try {
        cursosRegistro = require('../../cursos.json');
        // console.log("Cursos Listos");
    } catch (error) {
        // console.log(error);
        cursosRegistro = [];
    }
}

const guardarCursos = () => {
    let informacion = JSON.stringify(cursosRegistro);
    fs.writeFile('./cursos.json', informacion, 'utf8', (err) => {
        if (err) throw (err);
    })
}

const save = () => {
    let informacion = JSON.stringify(usuariosRegistro);
    fs.writeFile('./usuarios.json', informacion, 'utf8', (err) => {
        if (err) throw (err);
        console.log(err);
    })
}