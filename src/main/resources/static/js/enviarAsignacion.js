function armarJson(){

    const empleadosIds = Object.keys(empleadosMap).map(Number);
    const supervisoresIds = Object.keys(supervisoresMap).map(Number);
    const lugarIds = Object.keys(lugarMap).map(Number);
    const data = {
      servicios: servicioMapCosto,
      empleadosIds: empleadosIds,
      supervisoresIds: supervisoresIds,
      lugarIds: lugarIds,
      fecha_inicio: fechaAuxInicio.toISOString().split('T')[0],
      fecha_fin: fechaAuxFin.toISOString().split('T')[0],
      turno: document.getElementById('cbxturno').value,
      total: totalAPagar
    };
    return data;
}
function jsonFechaHoraIds(){
    const empleadosIds = Object.keys(empleadosMap).map(Number);
    const data = {
        fecha_inicio: fechaAuxInicio.toISOString().split('T')[0],
        fecha_fin: fechaAuxFin.toISOString().split('T')[0],
        turno: document.getElementById('cbxturno').value,
        empleadosIds: empleadosIds
    };
    return data;
}
async function verificarAsignacion(){
    const request = await fetch('api/asignacion/verificar', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonFechaHoraIds())
    });
    const empleados = await request.json();
    if(empleados.length === 0){
        agregarAsignacion();
    }else{
          $('#modalFechaHoraIds').modal('show');
          let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let empleado of empleados){
                cont=cont+1;
                var fecha = empleado[3]+'/'+empleado[4];
                //var hora = empleado[5]+'-'+empleado[6];turno
                let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado[1]+'</td><td>'+empleado[2]+'</td><td>'+fecha+'</td><td>'+empleado[5]+'</td><td>'+empleado[6]+'</td></tr>';
                listadoHtml+=empleadoHtml;
          }
          document.querySelector('#listaEmpleadosYaAsigandos tbody').outerHTML=listadoHtml;
    }
}
async function agregarAsignacion(){
     const request = await fetch('api/asignacion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(armarJson())
      });
      /*$('#formExitoAsignacion').modal('show');
          setTimeout(function() {
              $('#formExitoAsignacion').modal('hide');
          }, 2000);*/
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
