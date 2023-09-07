// Call the dataTables jQuery plugin

function mostrarAlerta(redireccionURL) {
    var popup = document.getElementById("popup");
    popup.style.display = "block";

    setTimeout(function() {
        popup.style.display = "none";

        // Redirige a la URL pasada como parámetro
        window.location.href = redireccionURL;
    }, 2000);
}
async function agregarEmpleado(datos){
        const request = await fetch('api/empleados', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
              });
              mostrarAlerta('listaEmpleados.html');
}
async function validarEmpleado(){
    const botonCargar = document.getElementById('botonCargar');

    botonCargar.disabled = true;
    botonCargar.textContent = 'Validando...';

    const contratacion = document.getElementById('txtFechaContratacion').value;
    const fechaContratacion = new Date(contratacion);
    const nacimiento=document.getElementById('txtFechaNacimiento').value;
    const fechaNacimiento = new Date(nacimiento);

    let datos = {};
    datos.carnet = document.getElementById('txtcarnet').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;
    datos.apellido_materno=document.getElementById('txtapellidoM').value;
    datos.fecha_contratacion = fechaContratacion;
    datos.puesto = document.getElementById('cbxpuesto').value;
    datos.salario = document.getElementById('txtsalario').value;
    datos.fecha_nacimiento = fechaNacimiento;
    datos.estado_civil = document.getElementById('cbxestado').value;
    datos.sexo = document.getElementById('cbxsexo').value;
    datos.direccion = document.getElementById('txtdireccion').value;
    datos.telefono = document.getElementById('txttelefono').value;
    datos.correo = document.getElementById('txtemail').value;
    datos.foto = "sin foto";

    const errorCarnet = document.getElementById('lblErrorCarnet');
    const errorNombres = document.getElementById('lblErrorNombres');
    const errorApellidos = document.getElementById('lblErrorApellidos');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorFN = document.getElementById('lblErrorFN');
    const errorFC = document.getElementById('lblErrorFC');
    const errorSalario = document.getElementById('lblErrorSalario');
    const errorDireccion = document.getElementById('lblErrorDireccion');
    const errorTelefono = document.getElementById('lblErrorTelefono');
    const errorCorreo = document.getElementById('lblErrorCorreo');
    const errorSexo = document.getElementById('lblErrorSexo');
    const errorPuesto = document.getElementById('lblErrorPuesto');
    const errorEC = document.getElementById('lblErrorEC');

    if(datos.carnet===""){
        errorCarnet.innerHTML = "Ingrese su carnet";
    }else if(!esNro(datos.carnet)){
        errorCarnet.innerHTML = "El carnet deben ser nros";
    }else if(datos.carnet.length<6){
        errorCarnet.innerHTML = "El carnet debe ser mayor a 5 digitos";
    }else if(datos.carnet.length>9){
        errorCarnet.innerHTML = "El carnet no debe superar los 9 digitos";
    }else{
        errorCarnet.innerHTML = "";
    }

    if(datos.nombre===""){
        errorNombres.innerHTML = "Ingrese el nombre";
    }else if(datos.nombre.length<3){
        errorNombres.innerHTML = "El nombre no debe ser tan corto";
    }else if(datos.nombre.length>20){
        errorNombres.innerHTML = "El nombre es muy largo";
    }else if(!soloLetras(datos.nombre)){
        errorNombres.innerHTML = "El nombres debe ser de solo letras";
    }else{
        errorNombres.innerHTML = "";
    }

    if(datos.apellido===""){
        errorApellidos.innerHTML = "Ingrese el apellido";
    }else if(datos.apellido.length<3){
        errorApellidos.innerHTML = "El apellido no debe ser tan corto";
    }else if(datos.apellido.length>20){
        errorApellidos.innerHTML = "El apellido es muy largo";
    }else if(!soloLetras(datos.apellido)){
       errorApellidos.innerHTML = "El apellido debe ser de solo letras";
    }else{
        errorApellidos.innerHTML = "";
    }

    if(datos.apellido_materno===""){
        errorApellidoM.innerHTML = "";
    }else if(datos.apellido_materno.length>20){
        errorApellidoM.innerHTML = "El apellido es muy largo";
    }else if(!soloLetras(datos.apellido_materno)){
        errorApellidoM.innerHTML = "El apellido debe ser de solo letras";
    }else{
        errorApellidoM.innerHTML = "";
    }

    //fecha contratacion
    errorFC.innerHTML = validarFC(contratacion);
    //puesto
    if(datos.puesto===""){
        errorPuesto.innerHTML="Ingreso puesto"
    }else{
        errorPuesto.innerHTML="";
    }
    //salario
    var salario = parseInt(datos.salario,10);
    if(datos.salario===""){
        errorSalario.innerHTML="Ingrese salario";
    }else if(!esNro(datos.salario)){
        errorSalario.innerHTML="Ingrese solo nros"
    }else if(parseInt(datos.salario,10)<2362){
        errorSalario.innerHTML="El salario debe ser mayor al salario minimo";
    }else if(parseInt(datos.salario,10)>10000){
        errorSalario.innerHTML="Coloque un salario acorde a la realidad";
    }else{
        errorSalario.innerHTML="";
    }
    //fecha nacimiento
    errorFN.innerHTML = validarFN(nacimiento);
    //estado
    if(datos.estado_civil===""){
        errorEC.innerHTML="Ingreso estado civil"
    }else{
        errorEC.innerHTML="";
    }
     //sexo
     if(datos.sexo===""){
        errorSexo.innerHTML="Ingreso el genero"
     }else{
        errorSexo.innerHTML="";
     }
     //direccion
     if(datos.direccion===""){
         errorDireccion.innerHTML="Ingreso su direccion"
     }else if(datos.direccion.length>99){
         errorDireccion.innerHTML="Es muy larga la direccion";
     }else if(datos.direccion.length<5){
        errorDireccion.innerHTML="La direccion al menos debe tener 5 letras";
     }else{
        errorDireccion.innerHTML="";
     }
     //telefono
     if (datos.telefono === "") {
         errorTelefono.innerHTML = "Ingrese su telefono";
     } else if (!esNro(datos.telefono)) {
         errorTelefono.innerHTML = "El telefono deben ser números";
     } else if (datos.telefono.length < 7) {
         errorTelefono.innerHTML = "El telefono debe ser mayor a 6 dígitos";
     } else if (datos.telefono.length > 8) {
         errorTelefono.innerHTML = "El telefono no debe superar los 8 dígitos";
     } else if (datos.telefono[0] !== "6" && datos.telefono[0] !== "7" && datos.telefono[0] !== "4") {
         errorTelefono.innerHTML = "El telefono debe comenzar con 6, 7 o 4";
     } else {
         errorTelefono.innerHTML = "";
     }

//coorreo
       if(datos.correo===''){
             errorCorreo.innerHTML="Ingrese correo";
      }else if(!esValidoCorreo(datos.correo)){
            errorCorreo.innerHTML="Correo en formato incorrecto";
      }else{
            errorCorreo.innerHTML="";
      }
      if(errorCorreo.innerHTML===""){
            await existeCorreo(datos.correo);
     }
     botonCargar.disabled = false;
     botonCargar.textContent = 'Agregar Empleado';

    if(errorCarnet.innerHTML==="" && errorNombres.innerHTML==="" && errorApellidos.innerHTML==="" && errorApellidoM.innerHTML === "" && errorSalario.innerHTML===""
        && errorDireccion.innerHTML==="" && errorTelefono.innerHTML==="" && errorCorreo.innerHTML==="" && errorPuesto.innerHTML===""
        && errorEC.innerHTML==="" && errorFC.innerHTML==="" && errorFN.innerHTML==="") {
        agregarEmpleado(datos);
    }

}
async function existeCorreo(email){
    const errorEmail = document.getElementById('lblErrorCorreo');
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
    if(answer=='existe'){
        errorEmail.innerHTML="El correo ya existe en la base de datos!";
    }else if(answer=='fail'){
        errorEmail.innerHTML="";
    }else{
        errorEmail.innerHTML="algo raro paso!";
    }
}
function esNro(texto){
    const patron =/^([0-9])*$/;
    return patron.test(String(texto));
}
function soloLetras(texto){//aumentar espacio
    const patron =/^[a-zA-Z\s]+$/;
    return patron.test(String(texto))
}
function esValidoCorreo(email){
    const patron = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return patron.test(String(email));
}

function validarFN(fecha){//validamos fecha nacimiento
    const fechaN = new Date(fecha);
    var anoActual=parseInt(new Date().getFullYear(),10);
    var anoFecha = parseInt(fechaN.getFullYear(),10);
    if (fecha==="") {
        return "La fecha de nacimiento no puede estar vacía.";
    }else if(anoFecha>anoActual){
        return "La fecha debe ser menor a la fecha actual";
    }else if((anoActual-anoFecha)<17){
        return "El empleado debe ser > 16 anios";
    }else if((anoActual-anoFecha)>60){
        return "El empleado no debe ser > 60 anios";
    }
    return "";
}
function validarFC(fecha){//validamos fecha contratacion
    const fechaC = new Date(fecha);
    var anoActual=parseInt(new Date().getFullYear(),10);
    var anoFecha = parseInt(fechaC.getFullYear(),10);
    if (fecha==="") {
        return "La fecha de contratacion no puede estar vacía.";
    }else if(anoFecha>anoActual){
        return "La fecha debe ser menor a la fecha actual";
    }else if((anoActual-anoFecha)>30){
        return "No creo que que la fecha de contratacion fue hace mas de 30 anios";
    }
    return "";
}


async function agregarCliente(){
    const registro = document.getElementById('txtfechaRegistro').value;
    const fechaRegistro = new Date(registro);

    let datos = {};
    datos.nombre_empresa = document.getElementById('txtnombreEmpresa').value;
    datos.nombre = document.getElementById('txtnombre').value;
    datos.apellido = document.getElementById('txtapellido').value;

    datos.direccion = document.getElementById('txtdireccion').value;
    datos.telefono = document.getElementById('txttelefono').value;
    datos.correo = document.getElementById('txtcorreo').value;
    datos.foto = "sin foto";
    datos.fecha_registro=fechaRegistro;
    datos.notas = document.getElementById('txtnotas').value;


      const request = await fetch('api/clientes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)//llama a la funcion JSON.STRI...agarra cualquier objeto de js
        // y lo convierte en json
      });
      alert("el cliente se creo de forma correcta");
      window.location.href = 'listaClientes.html';



}