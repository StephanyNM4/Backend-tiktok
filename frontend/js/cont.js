function ocultar1(){
    document.getElementById('contenedor1').style.display = "block";
    document.getElementById('contenedor2').style.display = "none";
    document.getElementById('contenedor3').style.display = "none";
    document.getElementById('agregarUsuario').style.display = "none";
    document.getElementById('contenedor2').innerHTML='';
    indiceUsuario = 0;
}

const cargarUsuarios = async () => {
    let respuesta = await fetch("http://localhost:3001/usuarios/",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    usuarios = await respuesta.json();
    console.log(usuarios);
    renderizarUsuarios();
}
cargarUsuarios();

const renderizarUsuarios = () => {
    usuarios.forEach((usuario) => {
        document.getElementById('usuarios').innerHTML +=
        `<div id="contenedor-usuario" onclick="ocultar2(${usuario.id})">
        <div><img id="img-usuarios" src="../Imagenes/${usuario.imagenPerfil}" alt=""></div> 
        <div id="nombre">${usuario.nombre}</div>
        </div>
        `
    });
}

const cargarPreguntasCategoria = async (indice) => {
    let respuesta = await fetch(`http://localhost:3001/categorias/${indice}/preguntas`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    let preguntasC = await respuesta.json();
    
    return preguntasC;
}

const actualizarUsuario = async (id) => {
    let respuesta = await fetch(`http://localhost:3000/users/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(steph)
        }
    );
    const usuarioActualizado = await respuesta.json();
    console.log(usuarioActualizado);
}
// actualizarUsuario(1);

const guardarUsuarios = async () => {
    let respuesta = await fetch("http://localhost:3001/usuarios/",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json)
    }
    );
    usuarioGuardado = await respuesta.json();
    console.log(usuarioGuardado);
    // renderizarUsuarios();
}
guardarUsuarios();

const eliminarUsuario = async () => {
    const steph = {
        "nombre": "Zuko",
        "genero": "F",
        "verificado": true,
        "edad": 22
    }
    let respuesta = await fetch(`http://localhost:3000/users`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(steph)
        }
    );
    let usuarioGuardado = await respuesta.json();
    console.log(usuarioGuardado);
}



