function mostrarModalServicio(){
    $('#formAgregarServicio').modal('show');
}
async function agregarServicioAsignacion(datos){
      const request = await fetch('api/servicio', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      $('#formAgregarServicio').modal('hide');
       cargarServiciosAsignacion();
}
function validacionServicioDesdeAsigancion(){
    let datos = {};
    datos.nombre = document.getElementById('txtnombreServicio').value;
    datos.costo_m2 = document.getElementById('txtcosto').value;
    datos.descripcion = document.getElementById('txtdescripcion').value;
    datos.categoria = document.getElementById('cbxcategoria').value;

    const errorNombreS = document.getElementById('lblErrorNombreS');
    const errorCosto = document.getElementById('lblErrorCosto');
    const errorDescripcion = document.getElementById('lblErrorDescripcion');

    errorNombreS.innerHTML = validarNombre(datos.nombre);
    errorCosto.innerHTML = validarCosto(datos.costo_m2);
    errorDescripcion.innerHTML = validarDireccion(datos.descripcion);

    if(errorNombreS.innerHTML==="" && errorCosto.innerHTML==="" && errorDescripcion.innerHTML===""){
         agregarServicioAsignacion(datos);
    }
}
function mostrarModalEmpleado(){
    $('#formAgregarEmpleado').modal('show');
}

async function agregarEmpleadoAsignacion(datos){
        const request = await fetch('api/empleados', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
        });
        $('#formAgregarEmpleado').modal('hide');
        mostrarEmpleados();
}
async function validarEmpleadoAsignacion(){
    const botonCargar = document.getElementById('botonCargar');

    botonCargar.disabled = true;
    botonCargar.textContent = 'Validando...';

    const contratacion = document.getElementById('txtFechaContratacion').value;
    const fechaContratacion = new Date(contratacion);
    const nacimiento=document.getElementById('txtFechaNacimiento').value;
    const fechaNacimiento = new Date(nacimiento);

    let datos = {};
    datos.carnet = document.getElementById('txtcarnet').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;
    datos.apellido_materno=document.getElementById('txtapellidoM').value;
    datos.fecha_contratacion = fechaContratacion;
    datos.puesto = document.getElementById('cbxpuesto').value;
    datos.salario = document.getElementById('txtsalario').value;
    datos.fecha_nacimiento = fechaNacimiento;
    datos.estado_civil = document.getElementById('cbxestado').value;
    datos.sexo = document.getElementById('cbxsexo').value;
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.telefono = document.getElementById('txttelefono').value;
    datos.correo = document.getElementById('txtemail').value;
    datos.foto = "sin foto";

    const errorCarnet = document.getElementById('lblErrorCarnet');
    const errorNombres = document.getElementById('lblErrorNombreAsignacion');
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

    errorCarnet.innerHTML = validarCarnet(datos.carnet);
    errorNombres.innerHTML = validarNombre(datos.nombre);
    errorApellidos.innerHTML = validarApellidoP(datos.apellido);
    errorApellidoM.innerHTML = validarApellidoM(datos.apellido_materno);
    errorFC.innerHTML = validarFC(contratacion);
    errorSalario.innerHTML = validarSalario(datos.salario);
    errorFN.innerHTML = validarFN(nacimiento);
    errorDireccion.innerHTML = validarDireccion(datos.direccion);
    errorTelefono.innerHTML = validarTelefono(datos.telefono);
    errorCorreo.innerHTML = validarCorreo(datos.correo);
     if(errorCorreo.innerHTML===""){
          await existeCorreo(datos.correo);
     }
     botonCargar.disabled = false;
     botonCargar.textContent = 'Agregar';

    if(errorCarnet.innerHTML==="" && errorNombres.innerHTML==="" && errorApellidos.innerHTML==="" && errorApellidoM.innerHTML === "" && errorSalario.innerHTML===""
        && errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorPuesto.innerHTML===""
        && errorEC.innerHTML==="" && errorFC.innerHTML==="" && errorFN.innerHTML==="") {
        agregarEmpleadoAsignacion(datos);
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
function nuevoCliente(){
    $('#formAgregarCliente').modal('show');
    initMapModel();
}
