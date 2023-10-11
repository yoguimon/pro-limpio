function armarJson(){
    // Obtener los IDs de servicios
    //const serviciosIds = Object.keys(serviciosMap).map(Number);
    const empleadosIds = Object.keys(empleadosMap).map(Number);
    const supervisoresIds = Object.keys(supervisoresMap).map(Number);
    const lugarIds = Object.keys(lugarMap).map(Number);
    const data = {
      servicios: servicioMapCosto,
      empleadosIds: empleadosIds,
      supervisoresIds: supervisoresIds,
      lugarIds: lugarIds,
      total: totalAPagar
    };
    return data;
}
async function agregarAsignacion(){
    var popup = document.getElementById("popupAsignacion");

      const request = await fetch('api/asignacion', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(armarJson())//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
    mostrarAlerta('index.html',popup);
}