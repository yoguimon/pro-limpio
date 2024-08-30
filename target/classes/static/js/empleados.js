var latAct;
var lonAct;

function mostrarAlerta(redireccionURL,popup) {
    popup.style.display = "block";
    setTimeout(function() {
        popup.style.display = "none";
        // Redirige a la URL pasada como parámetro
        window.location.href = redireccionURL;
    }, 2000);
}
function capturarUbicacion(mensaje){
    let asistencia={};
    if (mensaje === 'entrada') {
            const botonCargar = document.getElementById('botonCargar1');
            botonCargar.disabled = true;
            botonCargar.textContent = 'Registrando...';
            asistencia.tipo=0;
    } else{
            const botonCargar = document.getElementById('botonCargar2');
            botonCargar.disabled = true;
            botonCargar.textContent = 'Registrando...';
            asistencia.tipo=1;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (geoLocationPosition) {
            latAct = geoLocationPosition.coords.latitude;
            lonAct = geoLocationPosition.coords.longitude;
            marcarAsistencia(asistencia); // Llama a marcarAsistencia después de obtener la ubicación
        }, function(error) {
            alert("Error al obtener la ubicación: " + error.message);
        });
    } else {
        alert("Fallos en el Sistema, corrige tu configuración de geolocalización o conexión.");
    }
}
async function marcarAsistencia(asistencia){
    let idEmp = parseInt(localStorage.idEmpleado);
      asistencia.empleado={idEmpleado: idEmp};
      asistencia.latitud=latAct;
      asistencia.longitud=lonAct;
      const request = await fetch('/api/asistencia', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
    },
    body: JSON.stringify(asistencia)
    });
    if (asistencia.tipo === 0) {
            const botonCargar = document.getElementById('botonCargar1');
            botonCargar.disabled = false;
            botonCargar.textContent = 'Marcar Entrada';
            var popup = document.getElementById("popupEmpleado");
            mostrarAlerta("reportes.html",popup);
    } else if (asistencia.tipo === 1) {
            const botonCargar = document.getElementById('botonCargar2');
            botonCargar.disabled = false;
            botonCargar.textContent = 'Marcar Salida';
            var popup2 = document.getElementById("popupEmpleado2");
            mostrarAlerta("reportes.html",popup2);
    } else {
            alert("Algo fallo Corre!!!"); // Puedes manejar otros casos aquí si es necesario
    }
}
