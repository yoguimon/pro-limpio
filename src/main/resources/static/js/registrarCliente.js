async function agregarCliente(cliente){
    var popup = document.getElementById("popupCliente");
    const clienteYlugarData = {
        cliente,
        lugar: {
            latitud: la, // Reemplaza con la latitud real
            longitud: lo, // Reemplaza con la longitud real
        // Otros campos del lugar aquí
        },
    };

      const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteYlugarData)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      mostrarAlerta('listaClientes.html',popup);
}
function validacionCliente(){
    const registro = document.getElementById('txtfechaRegistro').value;
    const fechaRegistro = new Date(registro);

    let cliente = {};
    cliente.nombre_empresa = document.getElementById('txtnombreEmpresa').value;
    cliente.nombre = document.getElementById('txtnombre').value;
    cliente.apellido = document.getElementById('txtapellido').value;
    cliente.apellido_materno = document.getElementById('txtapellidoM').value;

    cliente.telefono = document.getElementById('txttelefono').value;
    cliente.correo = document.getElementById('txtcorreo').value;
    cliente.foto = "sin foto";
    cliente.fecha_registro=fechaRegistro;
    cliente.direccion = document.getElementById('txtdireccion').value;
    cliente.notas = document.getElementById('txtnotas').value;

    const errorNombreE = document.getElementById('lblErrorNombreE');
    const errorNombre = document.getElementById('lblErrorNombre');
    const errorApellidoP = document.getElementById('lblErrorApellidoP');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorDireccion =  document.getElementById('lblErrorDireccion');
    const errorTelefono =  document.getElementById('lblErrorTelefono');
    const errorCorreo = document.getElementById('lblErrorCorreo');
    const errorFR = document.getElementById('lblErrorFR');

    errorNombreE.innerHTML = validarNombre(cliente.nombre_empresa);
    errorNombre.innerHTML = validarNombre(cliente.nombre);
    errorApellidoP.innerHTML = validarApellidoP(cliente.apellido);
    errorApellidoM.innerHTML = validarApellidoM(cliente.apellido_materno);
    errorDireccion.innerHTML = validarDireccion(cliente.direccion);
    errorTelefono.innerHTML = validarTelefono(cliente.telefono);
    errorCorreo.innerHTML = validarCorreo(cliente.correo);
    errorFR.innerHTML = validarFR(registro);

    if(errorNombreE.innerHTML==="" && errorNombre.innerHTML==="" && errorApellidoP.innerHTML==="" && errorApellidoM.innerHTML==="" &&
        errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorFR.innerHTML===""){
         agregarCliente(cliente);
    }
}
