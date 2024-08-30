

$(document).ready(function() {
  verificarAutenticacion();
  cargarEmpleados();
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
                let botonEditar = '<a href="#" class="btn btn-primary btn-circle btn-sm" onclick="mostrarEmpleado('+empleado[0]+')"><i class="fas fa-exclamation-triangle"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-primary btn-circle btn-sm" onclick="eliminarEmpleado('+empleado[0]+')"><i class="fas fa-trash"></i></a>';
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
        //me devuelve un empleado
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

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn text-white" onclick="validarEdicionEmpleado('+empleado[0]+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn text-white" onclick="cancelar()">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;

}
async function validarEdicionEmpleado(id){
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

    const errorCarnet = document.getElementById('lblErrorCarnet');
    const errorNombres = document.getElementById('lblErrorNombres');
    const errorApellidos = document.getElementById('lblErrorApellidos');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorFN = document.getElementById('lblErrorFN');
    const errorFC = document.getElementById('lblErrorFC');
    const errorSalario = document.getElementById('lblErrorSalario');
    const errorDireccion = document.getElementById('lblErrorDireccion');
    const errorTelefono = document.getElementById('lblErrorTelefono');
    const errorCorreo = document.getElementById('lblErrorCorreo');
    const errorSexo = document.getElementById('lblErrorSexo');
    const errorPuesto = document.getElementById('lblErrorPuesto');
    const errorEC = document.getElementById('lblErrorEC');

    errorCarnet.innerHTML = validarCarnet(empleadoEditado.carnet);
    errorNombres.innerHTML = validarNombre(empleadoEditado.nombre);
    errorApellidos.innerHTML = validarApellidoP(empleadoEditado.apellido);
    errorApellidoM.innerHTML = validarApellidoM(empleadoEditado.apellido_materno);
    errorFC.innerHTML = validarFC(contratacion);
    errorSalario.innerHTML = validarSalario(empleadoEditado.salario);
    errorFN.innerHTML = validarFN(nacimiento);
    errorDireccion.innerHTML = validarDireccion(empleadoEditado.direccion);
    errorTelefono.innerHTML = validarTelefono(empleadoEditado.telefono);
    errorCorreo.innerHTML = validarCorreo(empleadoEditado.correo);

    if(errorCarnet.innerHTML==="" && errorNombres.innerHTML==="" && errorApellidos.innerHTML==="" && errorApellidoM.innerHTML === "" && errorSalario.innerHTML===""
        && errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorPuesto.innerHTML===""
        && errorEC.innerHTML==="" && errorFC.innerHTML==="" && errorFN.innerHTML==="" && errorCorreo.innerHTML==="") {
        editarEmpleado(empleadoEditado);
    }
}
async function existeCorreo(email){
    const errorEmail = document.getElementById('lblErrorCorreo');
    const requestData = { email: email };
    const request = await fetch('api/usuarios/verificarEmail', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
    });
    const answer = await request.text();
    if(answer=='existe'){
        errorEmail.innerHTML="El correo ya existe en la base de datos!";
    }else if(answer=='fail'){
        errorEmail.innerHTML="";
    }else{
        errorEmail.innerHTML="algo raro paso!";
    }

}
async function editarEmpleado(empleadoEditado){
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
function cancelar(){
    $('#formEdicion').modal('hide');
    document.getElementById('lblErrorCarnet').innerHTML="";
    document.getElementById('lblErrorNombres').innerHTML="";
    document.getElementById('lblErrorApellidos').innerHTML="";
    document.getElementById('lblErrorApellidoM').innerHTML="";
    document.getElementById('lblErrorFN').innerHTML="";
    document.getElementById('lblErrorFC').innerHTML="";
    document.getElementById('lblErrorSalario').innerHTML="";
    document.getElementById('lblErrorDireccion').innerHTML="";
    document.getElementById('lblErrorTelefono').innerHTML="";
    document.getElementById('lblErrorSexo').innerHTML="";
    document.getElementById('lblErrorPuesto').innerHTML="";
    document.getElementById('lblErrorEC').innerHTML="";
}


