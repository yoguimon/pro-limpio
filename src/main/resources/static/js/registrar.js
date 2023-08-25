// Call the dataTables jQuery plugin
$(document).ready(function() {
    //onready
});

async function agregarEmpleado(){
    const contratacion = document.getElementById('txtFechaContratacion').value;
    const fechaContratacion = new Date(contratacion);
    const nacimiento=document.getElementById('txtFechaNacimiento').value;
    const fechaNacimiento = new Date(nacimiento);

    let datos = {};
    datos.carnet = document.getElementById('txtcarnet').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;
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
    /*const fotoSeleccionada = document.getElementById('fotoInput').files[0];
        if (fotoSeleccionada) {
            datos.foto = fotoSeleccionada.name.toString();
        } else {
            datos.foto = "sin foto";
        }*/
        const request = await fetch('api/empleados', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                // y lo convierte en json
              });
              alert("el empleado de creo de forma correcta");
              window.location.href = 'listaEmpleados.html';
}



async function agregarCliente(){
    const registro = document.getElementById('txtfechaRegistro').value;
    const fechaRegistro = new Date(registro);

    let datos = {};
    datos.nombre_empresa = document.getElementById('txtnombreEmpresa').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;

    datos.direccion = document.getElementById('txtdireccion').value;
    datos.telefono = document.getElementById('txttelefono').value;
    datos.correo = document.getElementById('txtcorreo').value;
    datos.foto = "sin foto";
    datos.fecha_registro=fechaRegistro;
    datos.notas = document.getElementById('txtnotas').value;


      const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      alert("el cliente se creo de forma correcta");
      window.location.href = 'listaClientes.html';



}