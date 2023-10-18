function armarJson(){

    const empleadosIds = Object.keys(empleadosMap).map(Number);
    const supervisoresIds = Object.keys(supervisoresMap).map(Number);
    const lugarIds = Object.keys(lugarMap).map(Number);
    const data = {
      servicios: servicioMapCosto,
      empleadosIds: empleadosIds,
      supervisoresIds: supervisoresIds,
      lugarIds: lugarIds,
      fecha_inicio: fechaAuxInicio.toISOString().split('T')[0],
      fecha_fin: fechaAuxFin.toISOString().split('T')[0],
      hora_inicio: horaAuxIni,
      hora_fin: horaAuxFin,
      total: totalAPagar
    };
    return data;
}
async function agregarAsignacion(){
    //var popup = document.getElementById("popupAsignacion");

     const request = await fetch('api/asignacion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(armarJson())//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
    //mostrarAlerta('listaClientes.html',popup);
    $('#formExitoAsignacion').modal('show');
}