
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
    datos.cliente={idCliente: parseInt(obtenerIdDeUrl())};
    datos.nombre = document.getElementById('txtnombre').value;
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.notas = document.getElementById('txtnotas').value;
    datos.latitud=la;
    datos.longitud=lo;

    const errorDireccion = document.getElementById('lblErrorDireccion');
    const errorNombre = document.getElementById('lblErrorNombre');

    errorDireccion.innerHTML = validarDireccion(datos.direccion);
    errorNombre.innerHTML = validarNombre(datos.nombre);

    if(errorDireccion.innerHTML==="" && errorNombre.innerHTML===""){
         agregarLugar(datos);
    }
}
function obtenerIdDeUrl() {
     const parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}

function enviarIdAListaLugares(){
    var id = obtenerIdDeUrl();
    window.location.href = `listaLugares.html?id=${id}`;
}
