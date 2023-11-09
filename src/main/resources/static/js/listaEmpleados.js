

$(document).ready(function() {
  verificarAutenticacion();
  cargarEmpleados();
  $('#listaEmpleados').DataTable();
  actualizarEmailUser();
});
function finalizarSession(){
    localStorage.clear();
    window.location.href = 'login.html';
}
function actualizarEmailUser(){
    document.getElementById('txtEmailUser').outerHTML=localStorage.email;
}
function verificarAutenticacion() {
    const jwtToken = localStorage.getItem('token');

    if (!jwtToken) {
        // No hay token JWT, el usuario no ha iniciado sesión
        // Redirigir a la página de inicio de sesión o mostrar un mensaje de error
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    }
}
function actualizarEmailUser(){
    document.getElementById('txtEmailUser').outerHTML=localStorage.email;
}
async function cargarEmpleados(){
    const request = await fetch('api/empleados', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const empleados = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let empleado of empleados){
                cont=cont+1;
                let botonEditar = '<a href="#" class="btn btn-warning btn-circle btn-sm" onclick="mostrarEmpleado('+empleado[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm" onclick="eliminarEmpleado('+empleado[0]+')"><i class="fas fa-trash"></i></a>';
                let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado[1]+'</td><td>'+empleado[2]+'</td><td>'+empleado[3]+'</td><td>'+empleado[4]+'</td><td>'+empleado[5]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=empleadoHtml;
          }
          document.querySelector('#listaEmpleados tbody').outerHTML=listadoHtml;
}

async function mostrarEmpleado(id){
    $('#formEdicion').modal('show');
    const request = await fetch('api/empleados/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });

        //me devuelve una lista de empleados
        const empleado = await request.json();


        document.getElementById('txtcarnet').value=empleado[1];
        document.getElementById('txtnombre').value=empleado[2];
        document.getElementById('txtapellido').value=empleado[3];
        document.getElementById('txtapellidoM').value=empleado[4];
        document.getElementById('txtFechaContratacion').value=empleado[5];
        document.getElementById('cbxpuesto').value=empleado[6];
        document.getElementById('txtsalario').value=empleado[7];
        document.getElementById('txtFechaNacimiento').value=empleado[8];
        document.getElementById('cbxestado').value=empleado[9];
        document.getElementById('cbxsexo').value=empleado[10];
        document.getElementById('txtdireccion').value=empleado[11];
        document.getElementById('txttelefono').value=empleado[12];
        document.getElementById('txtemail').value=empleado[13];
        //datos.foto = "sin foto";

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarEmpleado('+empleado[0]+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;

}

async function editarEmpleado(id){

     const contratacion = document.getElementById('txtFechaContratacion').value;
     const fechaContratacion = new Date(contratacion);
     const nacimiento=document.getElementById('txtFechaNacimiento').value;
     const fechaNacimiento = new Date(nacimiento);

    let empleadoEditado={};
    empleadoEditado.idEmpleado=id;
    empleadoEditado.carnet = document.getElementById('txtcarnet').value;
    empleadoEditado.nombre = document.getElementById('txtnombre').value;
    empleadoEditado.apellido = document.getElementById('txtapellido').value;
    empleadoEditado.apellido_materno = document.getElementById('txtapellidoM').value;
    empleadoEditado.fecha_contratacion = fechaContratacion;
    empleadoEditado.puesto = document.getElementById('cbxpuesto').value;
    empleadoEditado.salario = document.getElementById('txtsalario').value;
    empleadoEditado.fecha_nacimiento = fechaNacimiento;
    empleadoEditado.estado_civil = document.getElementById('cbxestado').value;
    empleadoEditado.sexo = document.getElementById('cbxsexo').value;
    empleadoEditado.direccion = document.getElementById('txtdireccion').value;
    empleadoEditado.telefono = document.getElementById('txttelefono').value;
    empleadoEditado.correo = document.getElementById('txtemail').value;
    empleadoEditado.foto = "sin foto";

    const request = await fetch('api/empleados',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(empleadoEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    $('#formEdicion').modal('hide');
    cargarEmpleados();
}

async function eliminarEmpleado(id){
 $('#formEliminar').modal('show');

// Agrega un evento click al botón "Eliminar" dentro del modal
    document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
        // Realiza la eliminación utilizando el ID pasado como parámetro
        const request = await fetch('api/empleados/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        $('#formEliminar').modal('hide');
        // Recarga la página o realiza alguna otra acción después de la eliminación
        location.reload();
    });
}
