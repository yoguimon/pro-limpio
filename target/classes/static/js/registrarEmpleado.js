$(document).ready(function(){
    cargarFechaActual();
});
async function agregarEmpleado(datos){
        var popup = document.getElementById("popupEmpleado");
        const request = await fetch('api/empleados', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
              });
              mostrarAlerta('listaEmpleados.html',popup);
}
async function validarEmpleado(){
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
     botonCargar.textContent = 'Agregar Empleado';

    if(errorCarnet.innerHTML==="" && errorNombres.innerHTML==="" && errorApellidos.innerHTML==="" && errorApellidoM.innerHTML === "" && errorSalario.innerHTML===""
        && errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorPuesto.innerHTML===""
        && errorEC.innerHTML==="" && errorFC.innerHTML==="" && errorFN.innerHTML==="") {
        agregarEmpleado(datos);
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
function cargarFechaActual() {
    // Obtener la fecha actual en formato dd/mm/aaaa
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // Los meses son indexados desde 0
    let yyyy = today.getFullYear();

    // Formatear la fecha como dd/mm/aaaa
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let formattedDate = dd + '/' + mm + '/' + yyyy;
    // Asignar la fecha formateada al campo de entrada
    document.getElementById('txtFechaNacimiento').value = formattedDate;
    document.getElementById('txtFechaContratacion').value=formattedDate;

}