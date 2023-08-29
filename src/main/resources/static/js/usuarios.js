
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

async function iniciarSesionAux(){
    alert("esta fallando");
    /*let datos = {};
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
    }*/

}

async function iniciarSesion(){
    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.pass = document.getElementById('txtPassword').value;

     const request = await fetch('api/usuarios/verificar', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
            });
            const answer = await request.text();
            if(answer=='nuevo'){
                localStorage.setItem('email', datos.email);
                localStorage.setItem('pass', datos.pass);
                window.location.href = 'cambiarContrasena.html';

            }else if(answer=='viejo'){
                verificarYAsignarRol();
            }else{
                alert("respodio otra cosa");
            }
}
async function verificarYAsignarRol(){
        let login = {};
        login.email = document.getElementById('txtEmail').value;
        login.pass = document.getElementById('txtPassword').value;

          const request = await fetch('api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          });
        const respuesta = await request.text();
        if(respuesta=='Fail'){
            alert("inicio de sesion fallido");
        }
        if(respuesta=='Supervisor'){
              window.location.href = 'index.html';//para el supervisor
        }
        if(respuesta=='Auxiliar Limpieza'){
            window.location.href = 'indexAuxiliar.html';
        }
}

function validarContrasena(){
        const email=document.getElementById('lblemail').innerText;
        const passActual=document.getElementById('lblpass').innerText;

        const actual=document.getElementById('txtactualpass');
        const nueva = document.getElementById('txtnuevapass');
        const repetirnueva = document.getElementById('txtrepetirpass');
        const errorActual=document.getElementById('lblError1');
        const errorNueva=document.getElementById('lblError2');
        const errorRepetir=document.getElementById('lblError3');

        if(actual.value===''){
            errorActual.innerHTML="Ingrese su pass actual";
        }else if(actual.value!==passActual){
            errorActual.innerHTML="pass actual invalida";
        }else{
            errorActual.innerHTML = "";
        }

        if(nueva.value===''){
            errorNueva.innerHTML="Ingrese su pass nueva";
        }else if(!esValidaLaContrasena(nueva.value)){
            errorNueva.innerHTML="Pass nueva en formato incorrecto";
        }else{
            errorNueva.innerHTML="";
        }

        if(repetirnueva.value===''){
            errorRepetir.innerHTML="Este campo no puede estar vacio";
        }else if(repetirnueva.value!==nueva.value){
            errorRepetir.innerHTML="las pass no coinciden";
        }else{
            errorRepetir.innerHTML="";
        }

        if (errorActual.innerHTML === "" && errorNueva.innerHTML === "" && errorRepetir.innerHTML === "") {
            agregarPassBD(email,nueva.value);
        }
}
function esValidaLaContrasena(pass) {
    const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return expresion.test(String(pass));
}
async function agregarPassBD(correo,passs){
    let datos = {};
        datos.email = correo;
        datos.pass = passs;
         const request = await fetch('api/usuarios/password', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                });
                const answer = await request.text();
                if(answer=='exito'){
                    window.location.href = 'login.html';

                }else if(answer=='fail'){
                    alert("fallo algo, revisar");
                }else{
                    alert("respodio otra cosa");
                }
}