async function registrarUsuario(){

    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;
    datos.rol = document.getElementById('cbxrol').value;

    let repetirPass= document.getElementById('txtRepetirPassword').value;
    if(datos.password!=repetirPass){
        alert("Contrasenas Incorrectas");
        return;
    }

      const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });

      alert("el empleado de creo de forma correcta");
      window.location.href = 'index.html';

}

async function iniciarSesion(){

    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;

      const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
    const respuesta = await request.text();
    if(respuesta=='Fail'){
        alert("inicio de sesion fallido");
    }
    if(respuesta=='Supervisor'){
          window.location.href = 'index.html';
    }
    if(respuesta=='Auxiliar Limpieza'){
        window.location.href = 'indexAuxiliar.html';
    }

}