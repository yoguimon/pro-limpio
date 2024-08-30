var map;
var latitude;
var longitude;
var opcion;
async function mostrarAsistenciasDadoFechas(fechaAuxInicio,fechaAuxFin){
    let rango ={
        fecha_inicio: fechaAuxInicio.toISOString().split('T')[0],
        fecha_fin:fechaAuxFin.toISOString().split('T')[0]
    };
    const request = await fetch('api/asistencia/rangoFechas', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(rango)
    });
    const asistencias = await request.json();
    if(asistencias.length!=0){
        document.getElementById('divTablaAsistencia').style.display='block';
        let listadoHtml = '';
        let cont = 0;
        opcion = document.getElementById('cbxAsistencia').value;
        if(opcion==='Entrada'){
            for(let asistencia of asistencias){
                if(asistencia[5]!=1){
                    cont=cont+1;
                    const fecha = moment(asistencia[4]).format('D [de] MMMM [de] YYYY');
                    const hora = moment(asistencia[4]).format('HH:mm:ss');
                    const tipo = "Entrada";
                    let botonUbicacion = '<a class="btn btn-primary" onclick="mostrarUbicacion(' + asistencia[2] + ', \'' + asistencia[3] + '\')"><i class="fas fa-map-marker-alt"></i></a>';
                    let asistenciaHtml =  '<tr><td>'+cont+'</td><td>'+asistencia[1]+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+tipo+'</td><td>'+botonUbicacion+'</td></tr>';
                    listadoHtml+=asistenciaHtml;
                }
            }
        }else if(opcion==='Salida'){
            for(let asistencia of asistencias){
                if(asistencia[5]!=0){
                    cont=cont+1;
                    const fecha = moment(asistencia[4]).format('D [de] MMMM [de] YYYY');
                    const hora = moment(asistencia[4]).format('HH:mm:ss');
                    const tipo = "Salida";
                    let botonUbicacion = '<a class="btn btn-primary" onclick="mostrarUbicacion(' + asistencia[2] + ', \'' + asistencia[3] + '\')"><i class="fas fa-map-marker-alt"></i></a>';
                    let asistenciaHtml =  '<tr><td>'+cont+'</td><td>'+asistencia[1]+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+tipo+'</td><td>'+botonUbicacion+'</td></tr>';
                    listadoHtml+=asistenciaHtml;
                }
            }
        }else{
            for(let asistencia of asistencias){
               cont=cont+1;
               const fecha = moment(asistencia[4]).format('D [de] MMMM [de] YYYY');
               const hora = moment(asistencia[4]).format('HH:mm:ss');
               const tipo = (asistencia[5] === 1) ? "Salida" : "Entrada";
               let botonUbicacion = '<a class="btn btn-primary" onclick="mostrarUbicacion(' + asistencia[2] + ', \'' + asistencia[3] + '\')"><i class="fas fa-map-marker-alt"></i></a>';
               let asistenciaHtml =  '<tr><td>'+cont+'</td><td>'+asistencia[1]+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+tipo+'</td><td>'+botonUbicacion+'</td></tr>';
               listadoHtml+=asistenciaHtml;
            }
        }
        if(listadoHtml===''){
            document.querySelector('#listaTodasLasAsistencias tbody').outerHTML='<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            document.getElementById('divTablaAsistencia').style.display='none';
            $('#formAlertaTotal').modal('show');
            $("#formAlertaTotal .modal-body").text("No existe asistencias registradas en ese turno");
        }else{
            document.querySelector('#listaTodasLasAsistencias tbody').outerHTML=listadoHtml;
        }
    }else{
        document.getElementById('divTablaAsistencia').style.display='none';
        $('#formAlertaTotal').modal('show');
        $("#formAlertaTotal .modal-body").text("No existe asistencias registradas en ese rango de fecha");
    }
}
async function imprimirReporteAsitenciaPorFechas(){
    let fechas ={
        fecha_inicio: fechaAuxInicio.toISOString().split('T')[0],
        fecha_fin:fechaAuxFin.toISOString().split('T')[0],
        opcion: opcion.toString()
    };
    const request = await fetch('api/reporte/asistencia/rangoFechas', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fechas)
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
function ocultarMostrar(opcion,ruta){
    var table = document.getElementById(ruta);
    table.style.visibility  = opcion;
}
$('#modalMapa').on('shown.bs.modal', function () {
  if (!map) {
    map = L.map('map-container').setView([-17.39571, -66.15817], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      subdomains: ['a', 'b', 'c'],
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map);
  }
});

$('#modalMapa').on('hidden.bs.modal', function () {
  if (map) {
    map.remove();
    map = null;
  }
});
function mostrarUbicacion(latitud,longitud) {
    latitude = parseFloat(latitud);
    longitude = parseFloat(longitud);
    $('#modalMapa').modal('show');
}
function cerrarMapa(){
    $('#modalMapa').modal('hide');
}
document.getElementById('cbxAsistencia').addEventListener('change', function() {
  fechaEsValidaAsistencia('seleccionar');
});