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
    datos.costo_m2=document.getElementById('txtcosto').value;
    datos.descripcion = document.getElementById('txtdescripcion').value;
    datos.categoria = document.getElementById('cbxcategoria').value;

    const errorNombreS = document.getElementById('lblErrorNombreS');
    const errorCosto = document.getElementById('lblErrorCosto');
    const errorDescripcion = document.getElementById('lblErrorDescripcion');

    errorNombreS.innerHTML = validarNombre(datos.nombre);
    errorCosto.innerHTML = validarCosto(datos.costo_m2);
    errorDescripcion.innerHTML = validarDireccion(datos.descripcion);

    if(errorNombreS.innerHTML==="" && errorCosto.innerHTML==="" && errorDescripcion.innerHTML===""){
         agregarServicio(datos);
    }
}
