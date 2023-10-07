var contador=0;
var serviciosMap = {};//lista de servicios con su id
var empleadosMap = {};
var supervisoresMap={};
var clienteMap={};
var lugarMap={};
$(document).ready(function() {
  contador=1;
  agregarFila();
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
                    let botonRadio = '<label><input type="radio" name="opciones" value="' + cliente[0] + '" onclick="anadirATablaClienteYLugar(' + cliente[0] + ', \'' + cliente[1] + '\', \'' + cliente[3] + '\', \'' + cliente[4] + '\')"></label>';
                    let clienteHtml =  '<tr><td>'+cont+'</td><td>'+cliente[2]+'</td><td>'+cliente[3]+'</td><td>'+cliente[4]+'</td><td>'+cliente[5]+'</td><td>'+botonRadio+'</td></tr>';
                    listadoHtml+=clienteHtml;
              }
              document.querySelector('#listaClientesYSusLugares tbody').outerHTML=listadoHtml;
        }
}
async function mostrarClientes(){
    const request = await fetch('api/clientes/asignacion', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        //me devuelve una lista de empleados
        const clientes = await request.json();
        if(clientes.length === 0){
            document.getElementById("lblerrorBusqueda").innerHTML="No existe clientes agregados!";
        }else{
              document.getElementById("lblerrorBusqueda").innerHTML="";
              let listadoHtml = '';
                //para agragar usuarios de json
                let cont = 0;
              for(let cliente of clientes){
                    cont=cont+1;
                    let botonRadio = '<label><input type="radio" name="opciones" value="' + cliente[0] + '" onclick="anadirATablaClienteYLugar(' + cliente[0] + ', \'' + cliente[1] + '\', \'' + cliente[3] + '\', \'' + cliente[4] + '\')"></label>';
                    let clienteHtml =  '<tr><td>'+cont+'</td><td>'+cliente[2]+'</td><td>'+cliente[3]+'</td><td>'+cliente[4]+'</td><td>'+cliente[5]+'</td><td>'+botonRadio+'</td></tr>';
                    listadoHtml+=clienteHtml;
              }
              document.querySelector('#listaClientesYSusLugares tbody').outerHTML=listadoHtml;
        }
}
function anadirATablaClienteYLugar(idCliente,idLugar,nombreCliente,lugar){
    var tabla = document.getElementById("listaPreAsignacion");
    var celdaCliente = tabla.rows[contador].cells[1];
    var celdaLugar = tabla.rows[contador].cells[2];
    clienteMap={};
    lugarMap={};
    celdaCliente.innerHTML='';
    celdaLugar.innerHTML='';

        clienteMap[idCliente]=nombreCliente;
        lugarMap[idLugar]=lugar;

        var tablaCliente = document.createElement("table");
        var fila = document.createElement("tr");
        var nombreCelda = document.createElement("td");
        nombreCelda.textContent = nombreCliente;
        fila.appendChild(nombreCelda);

        var eliminarCelda = document.createElement("td");
        var botonEliminar = '<a class="btn btn-primary" onclick="eliminarClienteYLugar(' + idCliente + ', \'' + idLugar + '\')"><i class="fas fa-minus-square"></i></a>';
        eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
        fila.appendChild(eliminarCelda);

        tablaCliente.appendChild(fila);
        celdaCliente.appendChild(tablaCliente);

        var tablaLugar = document.createElement("table");
        var filaLugar = document.createElement("tr");
        var nombreCeldaLugar = document.createElement("td");
        nombreCeldaLugar.textContent = lugar;
        filaLugar.appendChild(nombreCeldaLugar);

        var eliminarCeldaLugar = document.createElement("td");
        var botonEliminarLugar = '<a class="btn btn-primary" onclick="eliminarClienteYLugar(' + idCliente + ', \'' + idLugar + '\')"><i class="fas fa-minus-square"></i></a>';
        eliminarCeldaLugar.insertAdjacentHTML('beforeend', botonEliminarLugar);
        filaLugar.appendChild(eliminarCeldaLugar);

        tablaLugar.appendChild(filaLugar);
        celdaLugar.appendChild(tablaLugar);

}
function eliminarClienteYLugar(idCliente,idLugar){
    var tablaCL = document.getElementById("listaClientesYSusLugares");
        var radios = tablaCL.querySelectorAll('input[type="radio"]');

        radios.forEach(function (radio) {
            radio.checked = false;
        });
    delete clienteMap[idCliente];
    delete lugarMap[idLugar];

    var tabla = document.getElementById("listaPreAsignacion");
    var celdaCliente = tabla.rows[contador].cells[1];
    var celdaLugar = tabla.rows[contador].cells[2];

    celdaCliente.innerHTML = ''; // Limpiar contenido de la celda de cliente
    celdaLugar.innerHTML = '';
    console.log(clienteMap);
    console.log(lugarMap);
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
                let totalLimpieza='<input type="text" class="small-input "id="input_' + cont + '" oninput="actualizarTotal(' + cont + ')">';
                let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + servicio[0] + '" onclick="anadirATabla(' + servicio[0] + ', \'' + servicio[1] + '\')"></label>';
                let servicioHtml =  '<tr><td>'+cont+'</td><td>'+servicio[1]+'</td><td>'+servicio[2]+'</td><td style="text-align: center;">'+servicio[3]+'</td><td style="text-align: center;">'+totalLimpieza+'</td><td style="text-align: center;"><label id="totalServicio_' + cont + '">-</label></td><td>'+botonCheckBox+'</td></tr>';
                listadoHtml+=servicioHtml;
          }


          document.querySelector('#listaServicios tbody').outerHTML=listadoHtml;

}
function actualizarTotal(cont) {
    const servicioValue = parseFloat(document.querySelector('#listaServicios tbody tr:nth-child(' + cont + ') td:nth-child(4)').textContent);
    const input = document.getElementById('input_' + cont);
    const totalServicioLabel = document.getElementById('totalServicio_' + cont);

    if (!isNaN(servicioValue) && !isNaN(input.value)) {
        const total = servicioValue * parseFloat(input.value);
        totalServicioLabel.textContent = total;
    } else {
        totalServicioLabel.textContent = '-';
    }
    if(input.value===''){
        totalServicioLabel.textContent = '-';
    }
}
function anadirATabla(idServicio,nombre){
    // Verificar si el checkbox está marcado o desmarcado
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idServicio + '"]');
    var tabla = document.getElementById("listaPreAsignacion");
    var celda = tabla.rows[contador].cells[3]; // Obtén la celda específica

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
               var botonEliminar = '<a class="btn btn-primary" onclick="eliminarServicio(' + id + ', \'' + servicio + '\')"><i class="fas fa-minus-square"></i></a>';
               eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
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
                var botonEliminar = '<a class="btn btn-primary" onclick="eliminarServicio(' + id + ', \'' + servicio + '\')"><i class="fas fa-minus-square"></i></a>';
                eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
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


async function buscarEmpleado(){
    const carnet = document.getElementById("txtBusquedaEmpleado").value.toString();
    const request = await fetch('api/empleadoXCarnet/'+carnet, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        try {
            const empleado = await request.json();
             document.getElementById("lblerrorBusquedaEmpleado").innerHTML="";
             let cont = 1;
             var nombre = empleado.nombre+' '+empleado.apellido+' '+empleado.apellido_materno;
             let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + empleado.idEmpleado + '" onclick="anadirATablaLosEmpleados(' + empleado.idEmpleado + ', \'' + nombre + '\')"></label>';
             let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado.carnet+'</td><td>'+nombre+'</td><td>'+botonCheckBox+'</td></tr>';
             document.querySelector('#listaEmpleadosXId tbody').outerHTML=empleadoHtml;

        } catch (error) {
            document.getElementById("lblerrorBusquedaEmpleado").innerHTML="Carnet Incorrecto!";
        }
}
async function buscarSupervisor(){
    const carnet = document.getElementById("txtBusquedaSupervisor").value.toString();
    const request = await fetch('api/empleadoXCarnet/'+carnet, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        try {
            const empleado = await request.json();
             document.getElementById("lblerrorBusquedaSupervisor").innerHTML="";
             let cont = 1;
             var nombre = empleado.nombre+' '+empleado.apellido+' '+empleado.apellido_materno;
             let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + empleado.idEmpleado + '" onclick="anadirATablaLosSupervisores(' + empleado.idEmpleado + ', \'' + nombre + '\')"></label>';
             let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado.carnet+'</td><td>'+nombre+'</td><td>'+botonCheckBox+'</td></tr>';
             document.querySelector('#listaSupervisores tbody').outerHTML=empleadoHtml;

        } catch (error) {
            document.getElementById("lblerrorBusquedaSupervisor").innerHTML="Carnet Incorrecto!";
        }
}
async function mostrarEmpleados(){
    const request = await fetch('api/empleados/todos', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const empleados = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let empleado of empleados){
                cont=cont+1;
                var nombre = empleado[2]+' '+empleado[3];
                let botonCheckBox = '<label><input type="checkbox" name="ops" value="' + empleado[0] + '" onclick="anadirATablaLosEmpleados(' + empleado[0] + ', \'' + nombre + '\')"></label>';
                let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado[1]+'</td><td>'+nombre+'</td><td>'+botonCheckBox+'</td></tr>';
                listadoHtml+=empleadoHtml;
          }
            document.querySelector('#listaEmpleadosXId tbody').outerHTML=listadoHtml;
}
function anadirATablaLosEmpleados(idEmpleado,nombre){
    // Verificar si el checkbox está marcado o desmarcado
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idEmpleado + '"]');
    var tabla = document.getElementById("listaPreAsignacion");
    var celda = tabla.rows[contador].cells[4]; // Obtén la celda específica

    // Eliminar el contenido existente de la celda
    celda.innerHTML = '';

    if (checkbox.checked) {
        if (!empleadosMap[idEmpleado]) {
            empleadosMap[idEmpleado] = nombre;
        }

        // Crear una nueva tabla para mostrar los servicios
        var tablaEmpleadosAsignados = document.createElement("table");

         for (var id in empleadosMap) {
            if (empleadosMap.hasOwnProperty(id)) {
               var empleado = empleadosMap[id];
               var fila = document.createElement("tr");
               var nombreCelda = document.createElement("td");
               nombreCelda.textContent = empleado;
               fila.appendChild(nombreCelda);

               // Agrega un botón de eliminar a cada fila
               var eliminarCelda = document.createElement("td");
               var botonEliminar = '<a class="btn btn-primary" onclick="eliminarEmpleadoAsignado(' + id + ', \'' + empleado + '\')"><i class="fas fa-minus-square"></i></a>';
               eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
               fila.appendChild(eliminarCelda);

               tablaEmpleadosAsignados.appendChild(fila);
            }
         }
         celda.appendChild(tablaEmpleadosAsignados);
         console.log(empleadosMap);
    } else { // Se desmarcó el checkbox
        delete empleadosMap[idEmpleado];

        var tablaEmpleadosAsignados = document.createElement("table");
        for (var id in empleadosMap) {
            if (empleadosMap.hasOwnProperty(id)) {
                var empleado = empleadosMap[id];
                var fila = document.createElement("tr");
                var nombreCelda = document.createElement("td");
                nombreCelda.textContent = empleado;
                fila.appendChild(nombreCelda);

                var eliminarCelda = document.createElement("td");
                var botonEliminar = '<a class="btn btn-primary" onclick="eliminarEmpleadoAsignado(' + id + ', \'' + empleado + '\')"><i class="fas fa-minus-square"></i></a>';
                eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
                fila.appendChild(eliminarCelda);

                tablaEmpleadosAsignados.appendChild(fila);
            }
        }
        celda.appendChild(tablaEmpleadosAsignados);
        console.log(empleadosMap);
    }

}
function eliminarEmpleadoAsignado(idEmpleado,nombre) {
 // Función para eliminar un servicio del mapa y actualizar la tabla
    delete empleadosMap[idEmpleado];
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idEmpleado + '"]');
    if (checkbox) {
        checkbox.checked = false; // Desmarca el checkbox
    }
    anadirATablaLosEmpleados(idEmpleado,nombre); // Vuelve a generar la tabla
 }

async function mostrarSupervisores(){
    const request = await fetch('api/supervisores/todos', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const empleados = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let empleado of empleados){
                cont=cont+1;
                var nombre = empleado[2]+' '+empleado[3];
                let botonCheckBox = '<label><input type="checkbox" name="op" value="' + empleado[0] + '" onclick="anadirATablaLosSupervisores(' + empleado[0] + ', \'' + nombre + '\')"></label>';
                let empleadoHtml =  '<tr><td>'+cont+'</td><td>'+empleado[1]+'</td><td>'+nombre+'</td><td>'+botonCheckBox+'</td></tr>';
                listadoHtml+=empleadoHtml;
          }
          document.querySelector('#listaSupervisores tbody').outerHTML=listadoHtml;
}
function anadirATablaLosSupervisores(idSupervisor,nombre){
    // Verificar si el checkbox está marcado o desmarcado
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idSupervisor + '"]');
    var tabla = document.getElementById("listaPreAsignacion");
    var celda = tabla.rows[contador].cells[5]; // Obtén la celda específica

    // Eliminar el contenido existente de la celda
    celda.innerHTML = '';

    if (checkbox.checked) {
        if (!supervisoresMap[idSupervisor]) {
            supervisoresMap[idSupervisor] = nombre;
        }

        // Crear una nueva tabla para mostrar los servicios
        var tablaSupervisoresAsignados = document.createElement("table");

         for (var id in supervisoresMap) {
            if (supervisoresMap.hasOwnProperty(id)) {
               var supervisor = supervisoresMap[id];
               var fila = document.createElement("tr");
               var nombreCelda = document.createElement("td");
               nombreCelda.textContent = supervisor;
               fila.appendChild(nombreCelda);

               // Agrega un botón de eliminar a cada fila
               var eliminarCelda = document.createElement("td");
               var botonEliminar = '<a class="btn btn-primary" onclick="eliminarSupervisorAsignado(' + id + ', \'' + supervisor + '\')"><i class="fas fa-minus-square"></i></a>';
               eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
               fila.appendChild(eliminarCelda);

               tablaSupervisoresAsignados.appendChild(fila);
            }
         }
         celda.appendChild(tablaSupervisoresAsignados);
         console.log(supervisoresMap);
    } else { // Se desmarcó el checkbox
        delete supervisoresMap[idSupervisor];

        var tablaSupervisoresAsignados = document.createElement("table");
        for (var id in supervisoresMap) {
            if (supervisoresMap.hasOwnProperty(id)) {
                var supervisor = supervisoresMap[id];
                var fila = document.createElement("tr");
                var nombreCelda = document.createElement("td");
                nombreCelda.textContent = supervisor;
                fila.appendChild(nombreCelda);

                var eliminarCelda = document.createElement("td");
                var botonEliminar = '<a class="btn btn-primary" onclick="eliminarSupervisorAsignado(' + id + ', \'' + supervisor + '\')"><i class="fas fa-minus-square"></i></a>';
                eliminarCelda.insertAdjacentHTML('beforeend', botonEliminar);
                fila.appendChild(eliminarCelda);

                tablaSupervisoresAsignados.appendChild(fila);
            }
        }
        celda.appendChild(tablaSupervisoresAsignados);
        console.log(supervisoresMap);
    }
}
function eliminarSupervisorAsignado(idSupervisor,nombre) {
 // Función para eliminar un servicio del mapa y actualizar la tabla
    delete supervisoresMap[idSupervisor];
    var checkbox = document.querySelector('input[type="checkbox"][value="' + idSupervisor + '"]');
    if (checkbox) {
        checkbox.checked = false; // Desmarca el checkbox
    }
    anadirATablaLosSupervisores(idSupervisor,nombre); // Vuelve a generar la tabla
 }
function validarDatos(boton) {
    const errorAsignacion = document.getElementById('lblerrorAsignaciones');
    errorAsignacion.innerHTML="";
    if (Object.keys(clienteMap).length === 0) {
        errorAsignacion.innerHTML = 'Ingrese Cliente y Lugar, ';
    }
    if (Object.keys(serviciosMap).length === 0) {
        errorAsignacion.innerHTML += 'Ingrese Servicios, ';
    }
    if (Object.keys(empleadosMap).length === 0) {
        errorAsignacion.innerHTML += 'Ingrese Empleados, ';
    }
    if (Object.keys(supervisoresMap).length === 0) {
        errorAsignacion.innerHTML += 'Ingrese Supervisores, ';
    }

    // Verifica si el mensaje de error está vacío
    if (errorAsignacion.innerHTML === "") {
        alert("Guardando Asignacion");
        /*if (boton === 'agregar') {
            alert("Agregar más Asignaciones");
            contador=contador+1;
            //anado siguiente fila ala tabla
            agregarFila();

            //tengo que guardar datos de asigancion y limpiar todos los maps
            desmarcar();
        }
        if (boton === 'guardar') {
            alert("Guardar las Asignaciones");
            //envio todos los datos para la asignacion en bd
        }*/
    }

}
function agregarFila(){
    const tabla = document.getElementById('listaPreAsignacion').getElementsByTagName('tbody')[0];

    // Crear una nueva fila
    const fila = document.createElement('tr');

    // Llena las celdas de la fila con los datos correspondientes
    fila.innerHTML = `
      <td>${contador}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <a class="btn btn-primary btn-circle btn-sm" onclick="eliminarFila(this)"><i class="fas fa-trash"></i></a>
      </td>
    `;

    // Agrega la fila a la tabla
    tabla.appendChild(fila);

}
function eliminarFila(boton) {
  // Obtén una referencia a la fila que contiene el botón
  const fila = boton.closest('tr');

  // Verifica si la fila existe antes de intentar eliminarla
  if (fila) {
    fila.remove(); // Elimina la fila
  }
  agregarFila();
  desmarcar();
  //LIMPIAR TODOS LOS MAPS
  empleadosMap = {};
  supervisoresMap={};
  clienteMap={};
  lugarMap={};
}
function desmarcar(){
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });

    // Desmarcar checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
}

