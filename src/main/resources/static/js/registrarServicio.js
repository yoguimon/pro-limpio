async function agregarServicio(datos){
    var popup = document.getElementById("popupServicio");
      const request = await fetch('api/servicio', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      mostrarAlerta('listaServicios.html',popup);
}
function validacionServicio(){
    let datos = {};
    datos.nombre = document.getElementById('txtnombreServicio').value;
    datos.descripcion = document.getElementById('txtdescripcion').value;
    datos.categoria = document.getElementById('cbxcategoria').value;

    const errorNombreS = document.getElementById('lblErrorNombreS');
    const errorDescripcion = document.getElementById('lblErrorDescripcion');

    errorNombreS.innerHTML = validarNombre(datos.nombre);
    errorDescripcion.innerHTML = validarDireccion(datos.descripcion);

    if(errorNombreS.innerHTML==="" && errorDescripcion.innerHTML===""){
         agregarServicio(datos);
    }
}
