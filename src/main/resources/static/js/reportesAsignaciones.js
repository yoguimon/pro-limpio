$(document).ready(function() {
  mostrarAsignaciones();
});
async function mostrarAsignaciones(){
    const request = await fetch('api/asignacion/reportes', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const asignaciones = await request.json();
        let listadoHtml = '';
        let cont = 0;
        for(let asignacion of asignaciones){
            cont=cont+1;
            let fecha = asignacion.servicioId[3]+' a '+asignacion.servicioId[4];
            let botonEmpleados = '<a href="#" class="btn btn-primary" onclick="mostrarEmpleados(' + asignacion.servicioId[0] + ')"><i class="fas fa-user"></i></a>';
            let botonServicios = '<a href="#" class="btn btn-success" onclick="mostrarServicios(' + asignacion.servicioId[0] + ')"><i class="fas fa-broom"></i></a>';
            let botonFinalizar = '<a href="#" class="btn btn-danger" onclick="finalizarAsignacion(' + asignacion.servicioId[0] + ')"><i class="fas fa-check-circle"></i></a>';
            let botonImprimir = '<a href="#" class="btn btn-warning" onclick="imprimirAsignacion(' + asignacion.servicioId[0] + ')"><i class="fas fa-print"></i></a>';
            let asignacionHtml =  '<tr><td>'+cont+'</td><td>'+asignacion.clienteLugar[1]+'</td><td>'+asignacion.clienteLugar[0]+'</td><td>'+botonEmpleados+'</td><td>'+botonServicios+'</td><td>'+asignacion.servicioId[2]+'</td><td>'+fecha+'</td><td>'+botonFinalizar+'</td><td>'+botonImprimir+'</td></tr>';
            listadoHtml+=asignacionHtml;
        }
        document.querySelector('#listaTodasAsignaciones tbody').outerHTML=listadoHtml;
}
async function mostrarEmpleados(id){
    $('#modalEmpleados').modal('show');
    const request = await fetch('api/asignacion/empleados/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const empleados = await request.json();
        let listadoHtml = '';
        let cont = 0;
        for(let empleado of empleados){
            cont=cont+1;
            let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado[1]+'</td><td>'+empleado[2]+'</td><td>'+empleado[3]+'</td><td>'+empleado[4]+'</td></tr>';
            listadoHtml+=empleadoHtml;
        }
        document.querySelector('#listaEmpleadosAsignados tbody').outerHTML=listadoHtml;
}
async function mostrarServicios(id){
    $('#modalServicios').modal('show');
    const request = await fetch('api/asignacion/servicios/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const servicios = await request.json();
        let listadoHtml = '';
        let cont = 0;
        for(let servicio of servicios){
            cont=cont+1;
            let servicioHtml =  '<tr><td>'+cont+'</td><td>'+servicio[1]+'</td><td>'+servicio[2]+'</td><td>'+servicio[3]+'</td></tr>';
            listadoHtml+=servicioHtml;
        }
        document.querySelector('#listaServiciosAsignados tbody').outerHTML=listadoHtml;
}
async function finalizarAsignacion(id){
    $('#formFinalizar').modal('show');
    document.getElementById('botonFinalizar').addEventListener('click', async function () {
        const request = await fetch('api/asignacion/finalizar/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        $('#formFinalizar').modal('hide');
        location.reload();
    });
}
async function imprimirAsignacion(id){
    const request = await fetch('api/asignacion/imprimir/'+id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    if (request.ok) {
        const response = await request.blob();
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
      //setTimeout(function() {
          window.open(fileURL, '_blank');
          location.reload();
      //}, 2000);
    } else {
      // Manejar el caso en el que la generación de reporte falla
        alert("fallo la generacion de reportes...");
    }
}
async function imprimirReporteGeneralAsignaciones(){
    const request = await fetch('api/reporte', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    if (request.ok) {
        const response = await request.blob();
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
          location.reload();
    } else {
      // Manejar el caso en el que la generación de reporte falla
        alert("fallo la generacion de reportes...");
    }
}