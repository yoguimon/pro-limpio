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
    var map=L.map('map-container').setView([-17.39571, -66.15817],100);
            //var map=L.map('map').setView([-17.393546195894256, -66.15706340003142],20);
            L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=oJKSCfNuOhhqQ5NzNe0n',{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map);
            //creas icono1
}