

$(document).ready(function() {
    cargarEmpleados();
  $('#listaEmpleados').DataTable();
});

async function cargarEmpleados(){
    const request = await fetch('api/empleados', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const empleados = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let empleado of empleados){
                cont=cont+1;
                let botonEditar = '<a href="#" onclick = "mostrarEmpleado('+empleado.idPersona+')" class="btn btn-warning btn-circle btn-sm"></a>';
                let botonEliminar = '<a href="#" onclick = "eliminarEmpleado('+empleado.idPersona+')" class="btn btn-danger btn-circle btn-sm"><i class="fass fa-trash"></i></a>';
                let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado.carnet+'</td><td>'+empleado.nombres+'</td><td>'+empleado.apellidoPaterno+'</td><td>'+empleado.apellidoMaterno+'</td><td>'+empleado.sexo+'</td><td>'+empleado.rol+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=empleadoHtml;
          }


          document.querySelector('#listaEmpleados tbody').outerHTML=listadoHtml;

}
async function mostrarEmpleado(id){
    $('#formEdicion').modal('show');
    const request = await fetch('api/empleados/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const empleado = await request.json();



        document.getElementById("txtcarnet").value=empleado.carnet;
        document.getElementById("txtnombres").value=empleado.nombres;
        document.getElementById("txtapellido1").value=empleado.apellidoPaterno;
        document.getElementById("txtapellido2").value=empleado.apellidoMaterno;
        document.getElementById("cbxsexo").value=empleado.sexo;
        document.getElementById("cbxrol").value=empleado.rol;

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarEmpleado('+empleado.idPersona+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-warning btn-user btn-block" data-dismiss="modal">Cancelar</button>';


        let botones = btnCancel+btnSaveChanges;
        document.querySelector('#botones').outerHTML=botones;
}

async function editarEmpleado(id){
    let empleadoEditado={};
    empleadoEditado.idPersona=id;
    empleadoEditado.carnet=document.getElementById('txtcarnet').value;
    empleadoEditado.nombres=document.getElementById('txtnombres').value;
    empleadoEditado.apellidoPaterno=document.getElementById('txtapellido1').value;
    empleadoEditado.apellidoMaterno=document.getElementById('txtapellido2').value;
    empleadoEditado.sexo=document.getElementById('cbxsexo').value;
    empleadoEditado.rol=document.getElementById('cbxrol').value;

    const request = await fetch('api/modificar',{
                method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(empleadoEditado)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
                        // y lo convierte en json
    });
    $('#formEdicion').modal('hide');
    cargarEmpleados();
}

async function eliminarEmpleado(id){
          if(!confirm('Desea eliminar este usuario?')){
              return;
          }

          const request = await fetch('api/empleados/'+id, {
                  method: 'DELETE',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
          });
          location.reload();
}