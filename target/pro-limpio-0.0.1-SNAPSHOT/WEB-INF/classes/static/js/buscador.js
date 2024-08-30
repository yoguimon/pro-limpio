var empleados
$(document).ready(function() {
  getEmpleadosAsistencia();
  limpiarTabla();
  ocultarMostrar('hidden','listaEmpleadosResultados')
});
document.addEventListener('DOMContentLoaded', function() {
        const search = document.getElementById('search');
        search.addEventListener("input", e => {
            limpiarTabla();
            const inpuText = e.target.value.toUpperCase().trim();
            const mostrarFiltrado = empleados.filter(empleado => empleado[1].toUpperCase().startsWith(inpuText));
            if(inpuText===''){
                limpiarTabla();
            }else{
                if(mostrarFiltrado.length===0){
                    ocultarMostrar('hidden','listaEmpleadosBuscador');
                }else{
                    mostrarEmpleadosFiltrados(mostrarFiltrado);
                }
            }
        });
});
async function getEmpleadosAsistencia(){
    const request = await fetch('api/empleados/asistencia', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    empleados = await request.json();
}
function limpiarTabla(){
    ocultarMostrar('hidden','listaEmpleadosBuscador');
    ocultarMostrar('hidden','listaEmpleadosResultados');
    const listaEmpleadosBuscador = document.querySelector('#listaEmpleadosBuscador tbody');
    const listaEmpleadosResultados = document.querySelector('#listaEmpleadosResultados tbody');
     if (listaEmpleadosBuscador) {
         listaEmpleadosBuscador.innerHTML = '';
     }
     if (listaEmpleadosResultados) {
         listaEmpleadosResultados.innerHTML = '';
     }
}
function ocultarMostrar(opcion,ruta){
    var table = document.getElementById(ruta);
    table.style.visibility  = opcion;
}