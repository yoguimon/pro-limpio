// Call the dataTables jQuery plugin
$(document).ready(function() {
    //onready
});

async function insertEmpleado(){
    let datos = {};
    datos.carnet = document.getElementById('txtcarnet').value;
    datos.nombres = document.getElementById('txtnombres').value;
    datos.apellidoPaterno = document.getElementById('txtapellido1').value;
    datos.apellidoMaterno = document.getElementById('txtapellido2').value;
    datos.sexo = document.getElementById('cbxsexo').value;
    datos.rol = document.getElementById('cbxrol').value;



      const request = await fetch('api/empleados', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      alert("la cuenta fue creada correctamente");
      window.location.href = 'listaEmpleados.html';



}