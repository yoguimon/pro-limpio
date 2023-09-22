var parametrosDeConsulta;
var la1;
var lo1;
$(document).ready(function() {
  verificarAutenticacion();
  mostrarLugar(obtenerIdDeUrl());
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
     const nombre = "Editar Lugar de : "+parametrosDeConsulta.get('nombre');
     document.getElementById('nombreCliente').innerHTML = nombre;
     return id;
}

async function mostrarLugar(id){
    const request = await fetch('api/lugar/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const lugar = await request.json();
        document.getElementById('txtnombre').value=lugar.nombre;
        document.getElementById('txtdireccion').value=lugar.direccion;
        document.getElementById('txtnotas').value=lugar.notas;

        if (marker) {
             map.removeLayer(marker);
        }
        var marcador = L.marker([parseFloat(lugar.latitud), parseFloat(lugar.longitud)]).addTo(map);
        la1=lugar.latitud;
        lo1=lugar.longitud;

        map.on('click', function (e) {
                // Actualiza la latitud y la longitud globales
                la1 = e.latlng.lat;
                lo1 = e.latlng.lng;
                // Actualiza la posición del marcador con la posición del clic
                marcador.setLatLng(e.latlng);
            });

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarLugar('+lugar.idLugar+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" onclick="volverLugaresXCliente()">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}
async function volverLugaresXCliente(){
    const idCliente = parametrosDeConsulta.get('cliente');;
    const nombre = parametrosDeConsulta.get('nombre');
    window.location.href = `listaLugares.html?id=${idCliente}&nombre=${nombre}`;
}
async function editarLugar(id){

    let lugarEditado={};
    lugarEditado.idLugar=id;
    lugarEditado.nombre = document.getElementById('txtnombre').value;
    lugarEditado.direccion = document.getElementById('txtdireccion').value;
    lugarEditado.notas = document.getElementById('txtnotas').value;
    lugarEditado.latitud=la1.toString();
    lugarEditado.longitud=lo1.toString();

    const request = await fetch('api/lugar',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(lugarEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    volverLugaresXCliente();
}