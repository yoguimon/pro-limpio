var parametrosDeConsultaLugar = new URLSearchParams(window.location.search);
$(document).ready(function() {
  ponerNombre();
});
async function agregarLugar(datos){
      const request = await fetch('/api/lugar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      enviarIdAListaLugares();

}
function validacionLugar(){
    let datos = {};
    const idCli = parseInt(obtenerIdDeUrl());
    datos.cliente={idCliente: idCli};
    datos.nombre = document.getElementById('txtnombre').value;
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.notas = document.getElementById('txtnotas').value;
    datos.latitud=la;
    datos.longitud=lo;

    const errorDireccion = document.getElementById('lblErrorDireccion');
    const errorNombre = document.getElementById('lblErrorNombre');
    const errorPosicion = document.getElementById('lblErrorMapa');

    errorDireccion.innerHTML = validarDireccion(datos.direccion);
    errorNombre.innerHTML = validarNombre(datos.nombre);
    errorNombre.innerHTML = validarPos(la);

    if(errorDireccion.innerHTML==="" && errorNombre.innerHTML==="" && errorPosicion.innerHTML===""){
         agregarLugar(datos);
    }
}
function validarPos(la){
    if(la===undefined){
        return "Ingrese Ubicacion!"
    }
    return "";
}
function ponerNombre(){
    const nombre = "Agregar lugar para el cliente: "+parametrosDeConsultaLugar.get('nombre');
    document.getElementById('nombreCliente').innerHTML = nombre;
}
function obtenerIdDeUrl() {
     const id = parametrosDeConsultaLugar.get('id');
     return id;
}

function enviarIdAListaLugares(){
    var id = obtenerIdDeUrl();
    var nom = parametrosDeConsultaLugar.get('nombre');
    window.location.href = `listaLugares.html?id=${id}&nombre=${nom}`;
}
