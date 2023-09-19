var la;
var lo;
//AQUI VAMOS A CONTROLAR SESSIONES
$(document).ready(function() {
    verificarAutenticacion();
    actualizarEmailUser();
    initMap();
});
function actualizarEmailUser(){
    document.getElementById('txtEmailUser').outerHTML=localStorage.email;
}

function finalizarSession(){
    localStorage.clear();
    window.location.href = 'login.html';
}
function verificarAutenticacion() {
    const jwtToken = localStorage.getItem('token');

    if (!jwtToken) {
        // No hay token JWT, el usuario no ha iniciado sesión
        // Redirigir a la página de inicio de sesión o mostrar un mensaje de error
        window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
    }
}

function initMap(){
    var map=L.map('map-container').setView([-17.39571, -66.15817],15);
            L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=oJKSCfNuOhhqQ5NzNe0n',{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map);
            //creas icono1
    var marker = L.marker([-17.39571, -66.15817]).addTo(map);
    // Agrega un evento de clic al mapa
    map.on('click', function (e) {
        // Actualiza la latitud y la longitud globales
        la = e.latlng.lat;
        lo = e.latlng.lng;
        // Actualiza la posición del marcador con la posición del clic
        marker.setLatLng(e.latlng);
    });
}