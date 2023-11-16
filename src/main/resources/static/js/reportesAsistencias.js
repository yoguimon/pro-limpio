var map;
var latitude;
var longitude;
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
        let listadoHtml = '';
        let cont = 0;
        let opcion = document.getElementById('cbxAsistencia').value;
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
        document.querySelector('#listaTodasLasAsistencias tbody').outerHTML=listadoHtml;
    }else{
        alert("No existe asistencias en ese rango de fecha");
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