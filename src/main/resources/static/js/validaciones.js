function mostrarAlerta(redireccionURL,popup) {
    popup.style.display = "block";
    setTimeout(function() {
        popup.style.display = "none";

        // Redirige a la URL pasada como parámetro
        window.location.href = redireccionURL;
    }, 2000);
}
function validarNombre(nombre){
    if(nombre===""){
            return "Ingrese el nombre";
        }else if(nombre.length<3){
            return "El nombre no debe ser tan corto";
        }else if(nombre.length>60){
            return "El nombre es muy largo";
        }else if(!soloLetras(nombre)){
            return "El nombres debe ser de solo letras";
        }else{
            return "";
        }
}
function validarNombreS(nombre){//validarNombreServicio
    if(nombre===""){
        return "Ingrese el nombre del servicio";
    }else if(esNro(nombre)){
        return "Ingrese un nombre de servicio";
    }else if(!soloLetras(nombre)){
        return "El nombres debe ser de solo letras";
    }else{
        return "";
    }
}
function validarApellidoP(apellidoP){
    if(apellidoP===""){
        return "Ingrese el apellido";
    }else if(apellidoP.length<3){
        return "El apellido no debe ser tan corto";
    }else if(apellidoP.length>20){
        return "El apellido es muy largo";
    }else if(!soloLetras(apellidoP)){
       return "El apellido debe ser de solo letras";
    }else{
        return "";
    }
}
function validarApellidoM(apellidoM){
    if(apellidoM===""){
        return "";
    }else if(apellidoM.length>20){
        return "El apellido es muy largo";
    }else if(!soloLetras(apellidoM)){
        return "El apellido debe ser de solo letras";
    }else{
        return "";
    }
}
function validarDireccion(direccion){
    if(direccion===""){
         return "Ingreso su direccion"
     }else if(direccion.length>99){
         return "Es muy larga la direccion";
     }else if(direccion.length<5){
        return "La direccion al menos debe tener 5 letras";
     }else{
        return "";
     }
}
function validarTelefono(telefono){
    if (telefono === "") {
         return "Ingrese su telefono";
     } else if (!esNro(telefono)) {
         return "El telefono deben ser números";
     } else if (telefono.length < 7) {
         return "El telefono debe ser mayor a 6 dígitos";
     } else if (telefono.length > 8) {
         return "El telefono no debe superar los 8 dígitos";
     } else if (telefono[0] !== "6" && telefono[0] !== "7" && telefono[0] !== "4") {
         return "El telefono debe comenzar con 6, 7 o 4";
     } else {
         return "";
     }
}
function validarFR(fecha){//fecha de registro
    const fechaC = new Date(fecha);
    var anoActual=parseInt(new Date().getFullYear(),10);
    var anoFecha = parseInt(fechaC.getFullYear(),10);
    var mesActual = new Date().getMonth() + 1;
    var mesFecha = fechaC.getMonth() + 1;
    var diaActual = new Date().getDate();
    var diaFecha = fechaC.getDate();
    if (fecha==="") {
        return "La fecha de contratacion no puede estar vacía.";
    }else if(anoFecha>anoActual){
        return "La fecha debe ser menor o igual a la fecha actual";
    }else if(anoFecha===anoActual){
            if(mesFecha>mesActual){
                return "La fecha debe ser menor o igual a la fecha actual";
            }else if(mesFecha===mesActual){
                if(diaFecha>diaActual){
                    return "La fecha debe ser menor o igual a la fecha actual";
                }
            }
    }
    return "";
}
function validarCorreo(correo){
    let res="";
    if(correo===''){
       res = "Ingrese correo";
    }else if(!esValidoCorreo(correo)){
       res = "Correo en formato incorrecto";
    }else{
       res = "";
    }
    //aqui toda ver si existe correo en bd
    return res;
}
function esValidoCorreo(email){
    const patron = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return patron.test(String(email));
}

function validarCarnet(carnet){
    if(carnet===""){
        return "Ingrese su carnet";
    }else if(!esNro(carnet)){
        return "El carnet deben ser nros";
    }else if(carnet.length<6){
        return "El carnet debe ser mayor a 5 digitos";
    }else if(carnet.length>9){
        return "El carnet no debe superar los 9 digitos";
    }else{
        return "";
    }
}
function esNro(texto){
    const patron =/^([0-9])*$/;
    return patron.test(String(texto));
}
function esNroDecimal(texto) {
    const patron = /^([0-9]+([.][0-9]*)?)?$/;
    return patron.test(String(texto));
}
function validarCosto(costo){
    if(costo===""){
        return "ingrese costo de servicio";
    }else if(!esNroDecimal(costo)){
        return "ingrese un numero entero o decimal"
    }else{
        return "";
    }
}
function soloLetras(texto){//aumentar espacio
    const patron =/^[a-zA-Z\s]+$/;
    return patron.test(String(texto))
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
function validarSalario(salario){
    //var salario = parseInt(datos.salario,10);
    if(salario===""){
        return "Ingrese salario";
    }else if(!esNro(salario)){
        return "Ingrese solo nros"
    }else if(parseInt(salario,10)<2362){
        return "El salario debe ser mayor al salario minimo";
    }else if(parseInt(salario,10)>10000){
        return "Coloque un salario acorde a la realidad";
    }else{
        return "";
    }
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