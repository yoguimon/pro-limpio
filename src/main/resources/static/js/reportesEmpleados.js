function mostrarEmpleadosFiltrados(resultados){
    let listadoHtml = '';
    let cont = 0;
    for(let resultado of resultados){
        cont=cont+1;
        let botonAsignaciones = '<a href="#" class="btn btn-primary" onclick="mostrarAsignacionesEmpleado('+resultado[0]+')"><i class="fas fa-tasks"></i></a>';
        let resultadoHtml =  '<tr><td>'+cont+'</td><td>'+resultado[1]+'</td><td>'+resultado[2]+'</td><td>'+resultado[3]+'</td><td>'+resultado[4]+'</td><td>'+botonAsignaciones+'</td></tr>';
        listadoHtml+=resultadoHtml;
    }

    ocultarMostrar('visible','listaEmpleadosBuscador');
    const listaEmpleadosBuscador = document.querySelector('#listaEmpleadosBuscador tbody');
    if (listaEmpleadosBuscador) {
        listaEmpleadosBuscador.innerHTML = listadoHtml;
    }

}
async function mostrarAsignacionesEmpleado(id){
    let btnImprimir='<button type="button" class="btn btn-primary" onclick="imprimirAsignacionesEmpleado('+id+')">Imprimir</button>';
    document.getElementById('btnImprimir').innerHTML = btnImprimir;

    const request = await fetch('api/empleados/reporte/'+id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const asignaciones = await request.json();
    if(asignaciones.length===0){
        $("#formAlertaTotal .modal-body").text("Este empleado no tiene asignaciones registradas");
        $("#formAlertaTotal").modal("show");
        document.getElementById('divBoton').style.display='none';
        ocultarMostrar('hidden','listaEmpleadosResultados');
        return;
    }
    document.getElementById('divBoton').style.display='block';
    let listadoHtml = '';
    let cont = 0;
    for(let asignacion of asignaciones){
        cont=cont+1;
        const fechaIni = moment(asignacion[3]).format('D/MM/YYYY');
        const fechaFin = moment(asignacion[4]).format('D/MM/YYYY');
        const fecha = fechaIni+" a "+fechaFin;
        let asignacionHtml =  '<tr><td>'+cont+'</td><td>'+asignacion[1]+'</td><td>'+asignacion[2]+'</td><td>'+fecha+'</td><td>'+asignacion[5]+'</td></tr>';
        listadoHtml+=asignacionHtml;
    }
    ocultarMostrar('visible','listaEmpleadosResultados');
    const listaEmpleadosBuscador = document.querySelector('#listaEmpleadosResultados tbody');
    if (listaEmpleadosBuscador) {
        listaEmpleadosBuscador.innerHTML = listadoHtml;
    }
}
async function imprimirAsignacionesEmpleado(id){
    document.getElementById('divBoton').style.display='none';
    const request = await fetch('api/reporte/empleado/asignaciones/'+id, {
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
          //location.reload();
    } else {
      // Manejar el caso en el que la generación de reporte falla
        alert("fallo la generacion de reportes...");
    }
}