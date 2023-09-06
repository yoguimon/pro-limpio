$(document).ready(function() {
  verificarAutenticacion();
  cargarClientes();
  $('#listaClientes').DataTable();
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

async function cargarClientes(){
    const request = await fetch('api/clientes', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const clientes = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let cliente of clientes){
                cont=cont+1;
                let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="mostrarCliente('+cliente[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarCliente('+cliente[0]+')"><i class="fas fa-trash"></i></a>';
                let clienteHtml =  '<tr><td>'+cont+'</td><td>'+cliente[1]+'</td><td>'+cliente[2]+'</td><td>'+cliente[3]+'</td><td>'+cliente[4]+'</td><td>'+cliente[5]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=clienteHtml;
          }


          document.querySelector('#listaClientes tbody').outerHTML=listadoHtml;

}


async function mostrarCliente(id){
    $('#formEdicion').modal('show');//posoble error
    const request = await fetch('api/clientes/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const cliente = await request.json();


        document.getElementById('txtnombreEmpresa').value=cliente.nombre_empresa;
        document.getElementById('txtnombre').value=cliente.nombre;
        document.getElementById('txtapellido').value=cliente.apellido;
        document.getElementById('txtdireccion').value=cliente.direccion;
        document.getElementById('txttelefono').value=cliente.telefono;
        document.getElementById('txtcorreo').value=cliente.correo;
        //datos.foto = "sin foto";
        document.getElementById('txtfechaRegistro').value=cliente.fecha_registro;
        document.getElementById('txtnotas').value=cliente.notas;

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarCliente('+cliente.idCliente+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}

async function editarCliente(id){

     const registro = document.getElementById('txtfechaRegistro').value;
     const fechaRegistro = new Date(registro);

    let clienteEditado={};
    clienteEditado.idCliente=id;
    clienteEditado.nombre_empresa = document.getElementById('txtnombreEmpresa').value;
    clienteEditado.nombre = document.getElementById('txtnombre').value;
    clienteEditado.apellido = document.getElementById('txtapellido').value;
    clienteEditado.direccion = document.getElementById('txtdireccion').value;
    clienteEditado.telefono = document.getElementById('txttelefono').value;
    clienteEditado.correo = document.getElementById('txtcorreo').value;
    clienteEditado.foto = "sin foto";
    clienteEditado.fecha_registro=fechaRegistro;
    clienteEditado.notas = document.getElementById('txtnotas').value;

    const request = await fetch('api/clientes',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(clienteEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    $('#formEdicion').modal('hide');
    cargarClientes();
}

async function eliminarCliente(id){
          if(!confirm('Desea eliminar este usuario?')){
              return;
          }

          const request = await fetch('api/clientes/'+id, {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
          });
          location.reload();
}
