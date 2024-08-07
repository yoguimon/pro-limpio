$(document).ready(function() {
  verificarAutenticacion();
  cargarServicios();
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
async function cargarServicios(){
    const request = await fetch('api/servicio', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const servicios = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
              for(let servicio of servicios){
                cont=cont+1;
                let botonEditar = '<a href="#" class="btn btn-primary btn-circle btn-sm" onclick="mostrarServicio('+servicio[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-primary btn-circle btn-sm" onclick="eliminarServicio('+servicio[0]+')"><i class="fas fa-trash"></i></a>';
                let clienteHtml =  '<tr><td>'+cont+'</td><td>'+servicio[1]+'</td><td>'+servicio[4]+'</td><td>'+servicio[3]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=clienteHtml;
          }


          document.querySelector('#listaServicios tbody').outerHTML=listadoHtml;

}
async function mostrarServicio(id){
    $('#formEdicion').modal('show');//posoble error
    const request = await fetch('api/servicio/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const servicio = await request.json();


        document.getElementById('txtnombreServicio').value=servicio[1];
        document.getElementById('txtcosto').value=servicio[2];
        document.getElementById('cbxcategoria').value=servicio[4];

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn text-white" onclick="validarEdicionServicio('+servicio[0]+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn text-white" onclick="cancelar()">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}
function validarEdicionServicio(id){
    let servicioEditado={};
    servicioEditado.idServicio=id;
    servicioEditado.nombre = document.getElementById('txtnombreServicio').value;
    servicioEditado.costo_m2 = document.getElementById('txtcosto').value;
    servicioEditado.categoria = document.getElementById('cbxcategoria').value;

    const errorNombreS = document.getElementById('lblErrorNombreS');
    const errorCosto = document.getElementById('lblErrorCosto');

    errorNombreS.innerHTML = validarNombre(servicioEditado.nombre);
    errorCosto.innerHTML = validarCosto(servicioEditado.costo_m2);

    if(errorNombreS.innerHTML==="" && errorCosto.innerHTML===""){
         editarServicio(servicioEditado);
    }
}
function cancelar(){
    $('#formEdicion').modal('hide');
    document.getElementById('lblErrorNombreS').innerHTML="";
    document.getElementById('lblErrorCosto').innerHTML="";
}
async function editarServicio(servicioEditado){
    const request = await fetch('api/servicio',{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicioEditado)
    });
    $('#formEdicion').modal('hide');
    cargarServicios();
}

async function eliminarServicio(id){
     $('#formEliminar').modal('show');

    // Agrega un evento click al botón "Eliminar" dentro del modal
        document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
            // Realiza la eliminación utilizando el ID pasado como parámetro
            const request = await fetch('api/servicio/' + id, {
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


