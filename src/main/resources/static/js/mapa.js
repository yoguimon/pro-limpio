
var la;
var lo;
var map;
var marker;
//AQUI VAMOS A CONTROLAR SESSIONES
$(document).ready(function() {
    initMap();
});
function initMap(){

    map=L.map('map-container').setView([-17.39571, -66.15817],12);
      /*L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=oJKSCfNuOhhqQ5NzNe0n',{
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
         }).addTo(map);*/
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                subdomains: ['a', 'b', 'c'],
                tileSize: 512, // Aumenta el tamaño del azulejo
                zoomOffset: -1, // Ajusta el zoom offset
                // Otros estilos de fuente personalizados aquí
        }).addTo(map);
        /*L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=oJKSCfNuOhhqQ5NzNe0n', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);*/
        /*L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
                attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> <a href="https://carto.com/attributions" target="_blank">© CartoDB</a>'
        }).addTo(map);*/


            //creas icono1
    marker = L.marker([-17.39571, -66.15817]).addTo(map);
    // Agrega un evento de clic al mapa
    map.on('click', function (e) {
        // Actualiza la latitud y la longitud globales
        la = e.latlng.lat;
        lo = e.latlng.lng;
        // Actualiza la posición del marcador con la posición del clic
        marker.setLatLng(e.latlng);
    });
}

