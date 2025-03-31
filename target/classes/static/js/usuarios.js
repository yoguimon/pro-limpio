
function usuarioSupervisor(){
    document.getElementById('txtEmail').value="jhonny@gmail.com";
    document.getElementById('txtPassword').value="Jhonny23@";
}

function usuarioTrabajador(){
    document.getElementById('txtEmail').value="roberto@gmail.com";
    document.getElementById('txtPassword').value="Roberto24@";
}
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

function mostrarAlerta(){
        var popup = document.getElementById("popup");
        popup.style.display = "block";

        setTimeout(function() {
            popup.style.display = "none";
        }, 2000); // 2000 milliseconds = 2 seconds
}
async function iniciarSesion(email,pass){
    const btn = document.querySelector("#btnlogin");
    btn.innerHTML = 'Cargando... <i class="fas fa-spinner fa-spin"></i>';
    btn.classList.add('disabled');
    btn.style.pointerEvents = 'none';
    let datos = {};
    datos.email = email;
    datos.pass = pass;
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
                localStorage.setItem('pass', datos.pass);
                localStorage.setItem('email', datos.email);
                window.location.href = 'cambiarContrasena.html';
                btn.innerHTML = 'Ingresar';
                btn.classList.remove('disabled');
                btn.style.pointerEvents = 'auto';
            }else if(answer=='viejo'){
                localStorage.setItem('pass', datos.pass);
                verificarYAsignarRol();
            }else{
                mostrarAlerta();
                btn.innerHTML = 'Ingresar';
                btn.classList.remove('disabled');
                btn.style.pointerEvents = 'auto';
            }
}
function validarLogin(){
    let datos = {};
    datos.email = document.getElementById('txtEmail').value;
    datos.pass = document.getElementById('txtPassword').value;
    const errorEmail = document.getElementById('lblErrorEmail');
    const errorPass = document.getElementById('lblErrorPass');
        if(datos.email===''){
            errorEmail.innerHTML="Ingrese correo";
        }else if(!esValidoCorreo(datos.email)){
            errorEmail.innerHTML="Correo en formato incorrecto";
        }else{
            errorEmail.innerHTML="";
        }
        if(datos.pass===''){
            errorPass.innerHTML="Ingrese contrasena";
        }else if(datos.pass.length<6){
            errorPass.innerHTML="Contrasena errorea";
        }else{
            errorPass.innerHTML="";
        }
        if(errorEmail.innerHTML === "" && errorPass.innerHTML === ""){
            iniciarSesion(datos.email,datos.pass);
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
        const respuesta = await request.json();
        if(respuesta.length!=0){
            localStorage.token = respuesta[0];
            localStorage.email = login.email;
            localStorage.rol = respuesta[1];
            localStorage.idEmpleado = respuesta[2];
            if(respuesta[1]=='Supervisor'){
                window.location.href = 'index.html';
            }else{
                if(respuesta[1]=='Auxiliar Limpieza'){
                    window.location.href = 'indexAuxiliar.html';
                }else{
                    mostrarAlerta();
                }
            }
        }else{
            mostrarAlerta();
        }
        const btn = document.querySelector("#btnlogin");
        btn.innerHTML = 'Ingresar';
        btn.classList.remove('disabled');
        btn.style.pointerEvents = 'auto';
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
            errorNueva.innerHTML="La contraseña debe ser >= 8 digitos. Al menos tener 1 letra mayuscula, 1 miniscula, 1 numero y 1 caracter especial";
        }else if(nueva.value.length<8){
            errorNueva.innerHTML="no debe ser menor a 8 digitos";
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
function esValidoCorreo(email){
    const patron = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return patron.test(String(email));
}
function esValidaLaContrasena(pass) {
    //const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]^\\/\|<>,.:;_-])[A-Za-z\d@$!%*?&#(){}[\]^\\/\|<>,.:;_-]{8,}$/;
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
function correoEsValido(){
    const email = document.getElementById('txtemail').value
    const errorEmail = document.getElementById('lblErrorEmail');
    if(email===''){
        errorEmail.innerHTML="Ingrese correo";
    }else if(!esValidoCorreo(email)){
        errorEmail.innerHTML="Correo en formato incorrecto";
    }else{
        errorEmail.innerHTML="";
    }
    if(errorEmail.innerHTML===""){
        existeCorreo(email);
    }
}
async function existeCorreo(email){
    const botonEnviar = document.getElementById('enviarCorreo');
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Espere unos segundos...';

    const errorEmail = document.getElementById('lblErrorEmail');
    const requestData = { email: email };
    const request = await fetch('api/usuarios/verificarEmail', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
    });
    const answer = await request.text();
    botonEnviar.disabled = false;
    botonEnviar.textContent = 'Cambiar Contraseña';
    if(answer=='existe'){
        errorEmail.innerHTML="Revisa tu correo, te enviamos un link";
    }else if(answer=='fail'){
        errorEmail.innerHTML="El correo no esta registrado en la Base de Datos";
    }else{
        errorEmail.innerHTML="algo raro paso!";
    }
}
function validarContrasenaCorreo(){

        const nueva = document.getElementById('txtnuevapass');
        const repetirnueva = document.getElementById('txtrepetirpass');
        const errorNueva=document.getElementById('lblError2');
        const errorRepetir=document.getElementById('lblError3');

        if(nueva.value===''){
            errorNueva.innerHTML="Ingrese su pass nueva";
        }else if(!esValidaLaContrasena(nueva.value)){
            errorNueva.innerHTML="La contraseña debe ser >= 8 digitos. Al menos tener 1 letra mayuscula, 1 miniscula, 1 numero y 1 caracter especial";
        }else if(nueva.value.length<8){
            errorNueva.innerHTML="no debe ser menor a 8 digitos";
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

        if (errorNueva.innerHTML === "" && errorRepetir.innerHTML === "") {
            agregarPassBDCorreo(nueva.value);//aqui revisar como obtener el correo
        }
}
async function agregarPassBDCorreo(passs){
    const urlActual = window.location.href;
    const url = new URL(urlActual);
    const correo = url.searchParams.get("email");
    let datos = {};
        datos.email = correo;
        datos.pass = passs;
         const request = await fetch('api/usuarios/passwordXcorreo', {
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