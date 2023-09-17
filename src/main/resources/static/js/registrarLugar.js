async function agregarLugar(datos){
    var popup = document.getElementById("popupLugar");
      const request = await fetch('api/lugar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      mostrarAlerta('listaLugares.html',popup);
}
function validacionLugar(){
    let datos = {};
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.tipo = document.getElementById('cbxtipo').value;

    const errorDireccion = document.getElementById('lblErrorDireccion');
    const errorNombre = document.getElementById('lblErrorNombre');

    errorDireccion.innerHTML = validarDireccion(datos.direccion);
    errorNombre.innerHTML = validarNombre(datos.nombre);

    if(errorDireccion.innerHTML==="" && errorNombre.innerHTML===""){
         agregarLugar(datos);
    }
}