var contAsignaciones=1;
var serviciosMap = {};//lista de servicios con su id
$(document).ready(function() {
  cargarServiciosAsignacion();
});
async function buscarCliente(){
    const carnet = document.getElementById("txtBusqueda").value.toString();
    const request = await fetch('api/clientesXCarnet/'+carnet, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const clientes = await request.json();
        if(clientes.length === 0){
            document.getElementById("lblerrorBusqueda").innerHTML="Carnet Incorrecto!";
        }else{
              document.getElementById("lblerrorBusqueda").innerHTML="";
              let listadoHtml = '';
                //para agragar usuarios de json
                let cont = 0;
              for(let cliente of clientes){
                    cont=cont+1;
                    let botonRadio = '<label><input type="radio" name="opciones" value="" onclick="tablaPreAsignacion(' + cliente[0] + ', \'' + cliente[1] + '\', \'' + cliente[3] + '\', \'' + cliente[4] + '\')"></label>';
                    let clienteHtml =  '<tr><td>'+cont+'</td><td>'+cliente[2]+'</td><td>'+cliente[3]+'</td><td>'+cliente[4]+'</td><td>'+cliente[5]+'</td><td>'+botonRadio+'</td></tr>';
                    listadoHtml+=clienteHtml;
              }
              document.querySelector('#listaClientesYSusLugares tbody').outerHTML=listadoHtml;
        }



}
async function cargarServiciosAsignacion(){
    const request = await fetch('api/servicio', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const servicios = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
              for(let servicio of servicios){
                cont=cont+1;
                let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + servicio[0] + '" onclick="anadirATabla(' + servicio[0] + ', \'' + servicio[1] + '\')"></label>'
                let clienteHtml =  '<tr><td>'+cont+'</td><td>'+servicio[1]+'</td><td>'+servicio[2]+'</td><td>'+botonCheckBox+'</td></tr>';
                listadoHtml+=clienteHtml;
          }


          document.querySelector('#listaServicios tbody').outerHTML=listadoHtml;

}
function anadirATabla(idServicio,nombre){
    // Verificar si el checkbox está marcado o desmarcado
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idServicio + '"]');
    var tabla = document.getElementById("listaPreAsignacion");
    var celda = tabla.rows[1].cells[3]; // Obtén la celda específica

    // Eliminar el contenido existente de la celda
    celda.innerHTML = '';

    if (checkbox.checked) {
        if (!serviciosMap[idServicio]) {
            // Agregar el servicio al mapa por su ID
            serviciosMap[idServicio] = nombre;
        }

        // Crear una nueva tabla para mostrar los servicios
        var tablaServicios = document.createElement("table");

         for (var id in serviciosMap) {
            if (serviciosMap.hasOwnProperty(id)) {
               var servicio = serviciosMap[id];
               var fila = document.createElement("tr");
               var nombreCelda = document.createElement("td");
               nombreCelda.textContent = servicio;
               fila.appendChild(nombreCelda);

               // Agrega un botón de eliminar a cada fila
               var eliminarCelda = document.createElement("td");
               var botonEliminar = document.createElement("button");
               botonEliminar.classList.add("btn", "btn-primary");
               botonEliminar.innerHTML = '<i class="fas fa-minus-square"></i>';
               botonEliminar.onclick = function() {
                    eliminarServicio(id,servicio);
               };
               eliminarCelda.appendChild(botonEliminar);
               fila.appendChild(eliminarCelda);

               tablaServicios.appendChild(fila);
            }
         }
         celda.appendChild(tablaServicios);
         //console.log(serviciosMap);
    } else { // Se desmarcó el checkbox
        delete serviciosMap[idServicio];

        var tablaServicios = document.createElement("table");
        for (var id in serviciosMap) {
            if (serviciosMap.hasOwnProperty(id)) {
                var servicio = serviciosMap[id];
                var fila = document.createElement("tr");
                var nombreCelda = document.createElement("td");
                nombreCelda.textContent = servicio;
                fila.appendChild(nombreCelda);

                var eliminarCelda = document.createElement("td");
                var botonEliminar = document.createElement("button");
                botonEliminar.classList.add("btn", "btn-primary");
                botonEliminar.innerHTML = '<i class="fas fa-minus-square"></i>';
                botonEliminar.onclick = function() {
                    eliminarServicio(id,servicio);
                };
                eliminarCelda.appendChild(botonEliminar);
                fila.appendChild(eliminarCelda);

                tablaServicios.appendChild(fila);
            }
        }
        celda.appendChild(tablaServicios);
        //console.log(serviciosMap);
    }

}
function eliminarServicio(idServicio,servicio) {
 // Función para eliminar un servicio del mapa y actualizar la tabla
    delete serviciosMap[idServicio];
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idServicio + '"]');
    if (checkbox) {
        checkbox.checked = false; // Desmarca el checkbox
    }
    anadirATabla(idServicio,servicio); // Vuelve a generar la tabla
 }
function tablaPreAsignacion(idCliente,idLugar,nombreCliente,lugar){
    let botonEliminar = '<a href="#" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
    let tablaAsignacionHtml =  '<tr><td>'+contAsignaciones+'</td><td>'+nombreCliente+'</td><td>'+lugar+'</td><td></td><td>'+'-'+'</td><td>'+'-'+'</td><td>'+botonEliminar+'</td></tr>';
    document.querySelector('#listaPreAsignacion tbody').outerHTML=tablaAsignacionHtml;
}