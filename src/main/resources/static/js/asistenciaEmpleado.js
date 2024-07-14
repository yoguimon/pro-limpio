$(document).ready(function() {
  cargarAsistencias();
});

//REPORTES ASISTENCIA EMPLEADO
async function cargarAsistencias(){
    const id = parseInt(localStorage.idEmpleado);
    const request = await fetch('api/asistencias/'+id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    //me devuelve una lista de empleados
    const asistencias = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let asistencia of asistencias){
                cont=cont+1;
                var tipo="";
                if(asistencia[4]===0){
                    tipo="entrada";
                }else{
                    tipo="salida";
                }
                let asistenciaHtml =  '<tr><td>'+cont+'</td><td>'+asistencia[1]+'</td><td>'+asistencia[0]+'</td><td>'+asistencia[2]+'</td><td>'+asistencia[3]+'</td><td>'+tipo+'</td></tr>';
                listadoHtml+=asistenciaHtml;
          }
          document.querySelector('#listaAsistencias tbody').outerHTML=listadoHtml;
}
