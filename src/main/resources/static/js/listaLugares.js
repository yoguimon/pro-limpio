
$(document).ready(function() {
  verificarAutenticacion();
  mostrarLugaresXCliente(obtenerIdDeUrl());
  $('#listaLugares').DataTable();
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
     const parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
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
                    let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="mostrarL('+lugar[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                    let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarC('+lugar[0]+')"><i class="fas fa-trash"></i></a>';
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
async function cargarLugares(){
    const request = await fetch('api/lugar', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const lugares = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
              for(let lugar of lugares){
                cont=cont+1;
                let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="mostrarLugar('+lugar[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarLugar('+lugar[0]+')"><i class="fas fa-trash"></i></a>';
                let clienteHtml =  '<tr><td>'+cont+'</td><td>'+lugar[1]+'</td><td>'+lugar[2]+'</td><td>'+lugar[3]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=clienteHtml;
          }


          document.querySelector('#listaLugares tbody').outerHTML=listadoHtml;

}
async function mostrarLugar(id){
    $('#formEdicion').modal('show');//posoble error
    const request = await fetch('api/lugar/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const lugar = await request.json();


        document.getElementById('txtdireccion').value=lugar.direccion;
        document.getElementById('txtnombre').value=lugar.nombre;
        document.getElementById('cbxtipo').value=lugar.tipo;

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarLugar('+lugar.idLugar+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}

async function editarLugar(id){

    let lugarEditado={};
    lugarEditado.idLugar=id;
    lugarEditado.direccion = document.getElementById('txtdireccion').value;
    lugarEditado.nombre = document.getElementById('txtnombre').value;
    lugarEditado.tipo = document.getElementById('cbxtipo').value;

    const request = await fetch('api/lugar',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(lugarEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    $('#formEdicion').modal('hide');;
    location.reload();
}

async function eliminarLugar(id){
          if(!confirm('Desea eliminar este lugar?')){
              return;
          }

          const request = await fetch('api/lugar/'+id, {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
          });
          location.reload();
}