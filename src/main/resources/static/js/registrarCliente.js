$(document).ready(function(){
    cargarFechaActual();
});

async function agregarCliente(clienteYlugarData){
    var popup = document.getElementById("popupCliente");

      const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteYlugarData)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const clave = parametrosDeConsulta.get('clave').toString();
     if(clave==='asignacion'){
        mostrarAlerta('registrarAsignacion.html',popup);
     }else{
        mostrarAlerta('listaClientes.html',popup);
     }
}
function validacionCliente(){
    const registro = document.getElementById('txtfechaRegistro').value;
    const fechaRegistro = new Date(registro);

    let cliente = {};
    cliente.carnet = document.getElementById('txtcarnet').value;
    cliente.nombre = document.getElementById('txtnombre').value;
    cliente.apellido = document.getElementById('txtapellido').value;
    cliente.apellido_materno = document.getElementById('txtapellidoM').value;

    cliente.telefono = document.getElementById('txttelefono').value;
    cliente.correo = document.getElementById('txtcorreo').value;
    cliente.foto = "sin foto";
    cliente.fecha_registro=fechaRegistro;


    let lugar = {};
    lugar.nombre=document.getElementById('txtnombreEmpresa').value;
    lugar.direccion =document.getElementById('txtdireccion').value;
    lugar.notas = document.getElementById('txtnotas').value;
    lugar.latitud=la;
    lugar.longitud=lo;

    const errorCarnet = document.getElementById('lblErrorCarnet');
    const errorNombreE = document.getElementById('lblErrorNombreE');
    const errorNombre = document.getElementById('lblErrorNombre');
    const errorApellidoP = document.getElementById('lblErrorApellidoP');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorDireccion =  document.getElementById('lblErrorDireccion');
    const errorTelefono =  document.getElementById('lblErrorTelefono');
    const errorCorreo = document.getElementById('lblErrorCorreo');
    const errorFR = document.getElementById('lblErrorFR');

    errorCarnet.innerHTML=validarCarnet(cliente.carnet)
    errorNombreE.innerHTML = validarNombre(lugar.nombre);
    errorNombre.innerHTML = validarNombre(cliente.nombre);
    errorApellidoP.innerHTML = validarApellidoP(cliente.apellido);
    errorApellidoM.innerHTML = validarApellidoM(cliente.apellido_materno);
    errorDireccion.innerHTML = validarDireccion(lugar.direccion);
    errorTelefono.innerHTML = validarTelefono(cliente.telefono);
    errorCorreo.innerHTML = validarCorreo(cliente.correo);
    errorFR.innerHTML = validarFR(registro);

    if(errorCarnet.innerHTML===""&&errorNombreE.innerHTML==="" && errorNombre.innerHTML==="" && errorApellidoP.innerHTML==="" && errorApellidoM.innerHTML==="" &&
        errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorFR.innerHTML===""){
        const clienteYlugarData = {
                cliente,
                lugar,
            };
         agregarCliente(clienteYlugarData);
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
    document.getElementById('txtfechaRegistro').value = formattedDate;

}
