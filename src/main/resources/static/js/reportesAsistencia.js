var map;
var latitude;
var longitude;
function mostrarEmpleadosFiltrados(resultados){
    let listadoHtml = '';
    let cont = 0;
    for(let resultado of resultados){
        cont=cont+1;
        let botonAsistencias = '<a href="#" class="btn btn-primary" onclick="mostrarAsistenciaEmpleado('+resultado[0]+')"><i class="fas fa-chalkboard"></i></a>';
        let resultadoHtml =  '<tr><td>'+cont+'</td><td>'+resultado[1]+'</td><td>'+resultado[2]+'</td><td>'+resultado[3]+'</td><td>'+resultado[4]+'</td><td>'+botonAsistencias+'</td></tr>';
        listadoHtml+=resultadoHtml;
    }

    ocultarMostrar('visible','listaEmpleadosBuscador');
    const listaEmpleadosBuscador = document.querySelector('#listaEmpleadosBuscador tbody');
    if (listaEmpleadosBuscador) {
        listaEmpleadosBuscador.innerHTML = listadoHtml;
    }

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
/////////////////////////////
async function mostrarAsistenciaEmpleado(id){
    //ocultarMostrar('visible','listaEmpleadosResultados');
    const request = await fetch('api/asistencia/empleado/'+id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const asistencias = await request.json();
    let listadoHtml = '';
    let cont = 0;
    for(let asistencia of asistencias){
        cont=cont+1;
        const fecha = moment(asistencia[4]).format('D [de] MMMM [de] YYYY');
        const hora = moment(asistencia[4]).format('HH:mm:ss');
        const tipo = (asistencia[5] === 1) ? "Salida" : "Entrada";
        let botonUbicacion = '<a href="#" class="btn btn-primary" onclick="mostrarUbicacion(' + asistencia[2] + ', \'' + asistencia[3] + '\')"><i class="fas fa-map-marker-alt"></i></a>';
        let asistenciaHtml =  '<tr><td>'+cont+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+tipo+'</td><td>'+botonUbicacion+'</td></tr>';
        listadoHtml+=asistenciaHtml;
    }
    ocultarMostrar('visible','listaEmpleadosResultados');
    const listaEmpleadosBuscador = document.querySelector('#listaEmpleadosResultados tbody');
    if (listaEmpleadosBuscador) {
        listaEmpleadosBuscador.innerHTML = listadoHtml;
    }
}

