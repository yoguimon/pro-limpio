async function agregarCliente(datos){
    var popup = document.getElementById("popupCliente");
      const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      mostrarAlerta('listaClientes.html',popup);
}
function validacionCliente(){
    const registro = document.getElementById('txtfechaRegistro').value;
    const fechaRegistro = new Date(registro);

    let datos = {};
    datos.nombre_empresa = document.getElementById('txtnombreEmpresa').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;
    datos.apellido_materno = document.getElementById('txtapellidoM').value;

    datos.telefono = document.getElementById('txttelefono').value;
    datos.correo = document.getElementById('txtcorreo').value;
    datos.foto = "sin foto";
    datos.fecha_registro=fechaRegistro;
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.notas = document.getElementById('txtnotas').value;

    const errorNombreE = document.getElementById('lblErrorNombreE');
    const errorNombre = document.getElementById('lblErrorNombre');
    const errorApellidoP = document.getElementById('lblErrorApellidoP');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorDireccion =  document.getElementById('lblErrorDireccion');
    const errorTelefono =  document.getElementById('lblErrorTelefono');
    const errorCorreo = document.getElementById('lblErrorCorreo');
    const errorFR = document.getElementById('lblErrorFR');

    errorNombreE.innerHTML = validarNombre(datos.nombre_empresa);
    errorNombre.innerHTML = validarNombre(datos.nombre);
    errorApellidoP.innerHTML = validarApellidoP(datos.apellido);
    errorApellidoM.innerHTML = validarApellidoM(datos.apellido_materno);
    errorDireccion.innerHTML = validarDireccion(datos.direccion);
    errorTelefono.innerHTML = validarTelefono(datos.telefono);
    errorCorreo.innerHTML = validarCorreo(datos.correo);
    errorFR.innerHTML = validarFR(registro);

    if(errorNombreE.innerHTML==="" && errorNombre.innerHTML==="" && errorApellidoP.innerHTML==="" && errorApellidoM.innerHTML==="" &&
        errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorFR.innerHTML===""){
         agregarCliente(datos);
    }
}
