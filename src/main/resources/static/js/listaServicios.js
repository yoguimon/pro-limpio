$(document).ready(function() {
  verificarAutenticacion();
  cargarServicios();
  $('#listaServicios').DataTable();
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
                let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="mostrarServicio('+servicio[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarServicio('+servicio[0]+')"><i class="fas fa-trash"></i></a>';
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

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarServicio('+servicio[0]+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}

async function editarServicio(id){

    let servicioEditado={};
    servicioEditado.idServicio=id;
    servicioEditado.nombre = document.getElementById('txtnombreServicio').value;
    servicioEditado.costo_m2 = document.getElementById('txtcosto').value;
    servicioEditado.categoria = document.getElementById('cbxcategoria').value;

    const request = await fetch('api/servicio',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(servicioEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    $('#formEdicion').modal('hide');
    //cargarServicios();
    location.reload();
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
