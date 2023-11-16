var parametrosDeConsulta;
$(document).ready(function() {
  verificarAutenticacion();
  mostrarLugaresXCliente(obtenerIdDeUrl());
  actualizarEmailUser();
});
function actualizarEmailUser(){
    document.getElementById('txtEmailUser').outerHTML=localStorage.email;
}
function finalizarSession(){
    localStorage.clear();
    window.location.href = 'login.html';
}
function verificarAutenticacion() {
    const jwtToken = localStorage.getItem('token');

    if (!jwtToken) {
        // No hay token JWT, el usuario no ha iniciado sesión
        // Redirigir a la página de inicio de sesión o mostrar un mensaje de error
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    }
}
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     const nombre = "Cliente: "+parametrosDeConsulta.get('nombre');
     document.getElementById('nombreCliente').innerHTML = nombre;
     return id;
}

function enviarIdAFormulario(){
    var id = obtenerIdDeUrl();
    var nom = parametrosDeConsulta.get('nombre');
    window.location.href = `formularioLugar.html?id=${id}&nombre=${nom}`;
}

async function mostrarLugaresXCliente(id){
    const request = await fetch('api/lugares/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const lugares = await request.json();

        let listadoHtml = '';
                //para agragar usuarios de json
               let cont = 0;
              for(let lugar of lugares){
                    cont=cont+1;
                    let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="enviarAFormularioEditar('+lugar[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                    let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarLugar('+lugar[0]+')"><i class="fas fa-trash"></i></a>';
                    let lugarHtml =  '<tr><td>'+cont+'</td><td>'+lugar[2]+'</td><td>'+lugar[3]+'</td><td>'+lugar[4]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                    listadoHtml+=lugarHtml;
              }
              document.querySelector('#listaLugares tbody').outerHTML=listadoHtml;
              mostrarUbicaciones(lugares);

}
function mostrarUbicaciones(lugares){
    for(let lugar of lugares){
        if (marker) {
                map.removeLayer(marker);
        }
        var marcador = L.marker([parseFloat(lugar[5]), parseFloat(lugar[6])]).addTo(map);
    }
}
function enviarAFormularioEditar(id){
    // Convierte el ID y el nombre a cadenas de texto
    const idComoCadena = id.toString();
    // Codifica los valores para asegurarte de que sean seguros en una URL
    const idCodificado = encodeURIComponent(idComoCadena);
    // Redirige a la página "formularioEditarLugar.html" con el ID y el nombre en la URL
    const nom = parametrosDeConsulta.get('nombre');
    const idCliente = parametrosDeConsulta.get('id');
    window.location.href = `formularioEditarLugar.html?id=${idCodificado}&nombre=${nom}&cliente=${idCliente}`;
}


async function eliminarLugar(id){
    $('#formEliminar').modal('show');

// Agrega un evento click al botón "Eliminar" dentro del modal
    document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
        // Realiza la eliminación utilizando el ID pasado como parámetro
        const request = await fetch('api/lugar/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        $('#formEdicion').modal('hide');
        // Recarga la página o realiza alguna otra acción después de la eliminación
        location.reload();
    });
}