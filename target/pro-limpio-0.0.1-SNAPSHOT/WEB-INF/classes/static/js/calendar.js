var fechaAuxInicio, fechaAuxFin;
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
$(document).ready(function() {
    // Configura el datepickerInicio con el formato deseado
  $("#datepickerInicio").datepicker({
    dateFormat: 'dd/mm/yy',  // Establece el formato día/mes/año
    // Otras opciones y configuraciones si las necesitas
  });

  // Configura el datepickerFin con el formato deseado, si es necesario
  $("#datepickerFin").datepicker({
    dateFormat: 'dd/mm/yy',  // Establece el formato día/mes/año
    // Otras opciones y configuraciones si las necesitas
  });
 iniciarFechaYHora();
  $('#myModalFecha').on('show.bs.modal', function() {
         fechaAuxInicio = $("#datepickerInicio").datepicker("getDate");
         fechaAuxFin = $("#datepickerFin").datepicker("getDate");
  });

});
function iniciarFechaYHora(){
    // definir que se vai criar um objeto data
    var data = new Date();
    fechaAuxInicio=data;
    fechaAuxFin=data;
	// aparecer no ecrã o dia do mês
	document.getElementById("dia").innerHTML = data.getDate();
	document.getElementById("diaFin").innerHTML = data.getDate();
	document.getElementById("mes").innerHTML = meses[data.getMonth()];
	document.getElementById("mesFin").innerHTML = meses[data.getMonth()];
	document.getElementById("ano").innerHTML = data.getFullYear();
	document.getElementById("anoFin").innerHTML = data.getFullYear();

    
    // Establecer valores por defecto de los datepickers
    $(function () {
        $("#datepickerInicio").datepicker().datepicker("setDate", new Date());
    });

    $(function () {
        $("#datepickerFin").datepicker().datepicker("setDate", new Date());
    });
}
function mostarModalFecha(){
    $('#myModalFecha').modal('show');
}
function seleccionarFecha(texto) {
    var dateIni = $("#datepickerInicio").datepicker("getDate");
    var dateFin = $("#datepickerFin").datepicker("getDate");
    if(texto==="cancelar"){
        $("#datepickerInicio").datepicker("setDate", fechaAuxInicio);
        $("#datepickerFin").datepicker("setDate", fechaAuxFin);
        $('#myModalFecha').modal('hide');
        return;
    }

    var dia = dateIni.getDate();
    var mes = meses[dateIni.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    var ano = dateIni.getFullYear();

    $("#dia").text(dia);
    $("#mes").text(mes);
    $("#ano").text(ano);

    dia = dateFin.getDate();
    mes = meses[dateFin.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    ano = dateFin.getFullYear();

    $("#diaFin").text(dia);
    $("#mesFin").text(mes);
    $("#anoFin").text(ano);
    $('#myModalFecha').modal('hide');

}

function fechaEsValida(texto){
    var fechaIni = $("#datepickerInicio").datepicker("getDate");
    var fechaFin = $("#datepickerFin").datepicker("getDate");
    if(texto==="cancelar"){
        $("#datepickerInicio").datepicker("setDate", fechaAuxInicio);
        $("#datepickerFin").datepicker("setDate", fechaAuxFin);
        $('#myModalFecha').modal('hide');
        return;
    }

    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    fechaIni.setHours(0, 0, 0, 0);
    fechaFin.setHours(0, 0, 0, 0);
    if(fechaIni.getTime() < fechaActual.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser anterior a la fecha actual");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
        //return false;
    }
    if(fechaFin.getTime() < fechaIni.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de finalización no puede ser anterior a la fecha de inicio");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
        //return false;
    }
    if(fechaIni.getTime() > fechaFin.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser posterior a la fecha de finalización");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
        //return false;
    }
    fechaAuxInicio=fechaIni;
    fechaAuxFin=fechaFin;
  //  return true;

    var dia = fechaIni.getDate();
    var mes = meses[fechaIni.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    var ano = fechaIni.getFullYear();

    $("#dia").text(dia);
    $("#mes").text(mes);
    $("#ano").text(ano);

    dia = fechaFin.getDate();
    mes = meses[fechaFin.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    ano = fechaFin.getFullYear();

    $("#diaFin").text(dia);
    $("#mesFin").text(mes);
    $("#anoFin").text(ano);
    $('#myModalFecha').modal('hide');
}
function fechaEsValidaAsigancion(texto){
    var fechaIni = $("#datepickerInicio").datepicker("getDate");
    var fechaFin = $("#datepickerFin").datepicker("getDate");
    if(texto==="cancelar"){
        $("#datepickerInicio").datepicker("setDate", fechaAuxInicio);
        $("#datepickerFin").datepicker("setDate", fechaAuxFin);
        $('#myModalFecha').modal('hide');
        return;
    }

    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    fechaIni.setHours(0, 0, 0, 0);
    fechaFin.setHours(0, 0, 0, 0);

    if(fechaFin.getTime() < fechaIni.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de finalización no puede ser anterior a la fecha de inicio");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
    }
    if(fechaIni.getTime() > fechaFin.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser posterior a la fecha de finalización");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
    }
    fechaAuxInicio=fechaIni;
    fechaAuxFin=fechaFin;
  //  return true;

    var dia = fechaIni.getDate();
    var mes = meses[fechaIni.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    var ano = fechaIni.getFullYear();

    $("#dia").text(dia);
    $("#mes").text(mes);
    $("#ano").text(ano);

    dia = fechaFin.getDate();
    mes = meses[fechaFin.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    ano = fechaFin.getFullYear();

    $("#diaFin").text(dia);
    $("#mesFin").text(mes);
    $("#anoFin").text(ano);
    $('#myModalFecha').modal('hide');

    //mostramos la tabla de asignaciones dado un rango de fecha
    mostrarAsignacionesDadoFechas(fechaAuxInicio,fechaAuxFin);
}
function fechaEsValidaAsistencia(texto){
    var fechaIni = $("#datepickerInicio").datepicker("getDate");
    var fechaFin = $("#datepickerFin").datepicker("getDate");
    if(texto==="cancelar"){
        $("#datepickerInicio").datepicker("setDate", fechaAuxInicio);
        $("#datepickerFin").datepicker("setDate", fechaAuxFin);
        $('#myModalFecha').modal('hide');
        return;
    }

    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    fechaIni.setHours(0, 0, 0, 0);
    fechaFin.setHours(0, 0, 0, 0);
    if(fechaIni.getTime() > fechaActual.getTime() || fechaFin.getTime() > fechaActual.getTime()) {
        $("#formAlertaTotal .modal-body").text("El rango de fecha no puede ser mayor a la fecha actual");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
        //return false;
    }
    if(fechaFin.getTime() < fechaIni.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de finalización no puede ser anterior a la fecha de inicio");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
    }
    if(fechaIni.getTime() > fechaFin.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser posterior a la fecha de finalización");
        $('#myModalFecha').modal('hide');
        $("#formAlertaTotal").modal("show");
        iniciarFechaYHora();
        return;
    }
    fechaAuxInicio=fechaIni;
    fechaAuxFin=fechaFin;
  //  return true;

    var dia = fechaIni.getDate();
    var mes = meses[fechaIni.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    var ano = fechaIni.getFullYear();

    $("#dia").text(dia);
    $("#mes").text(mes);
    $("#ano").text(ano);

    dia = fechaFin.getDate();
    mes = meses[fechaFin.getMonth()]; // Se suma 1 porque los meses se indexan desde 0
    ano = fechaFin.getFullYear();

    $("#diaFin").text(dia);
    $("#mesFin").text(mes);
    $("#anoFin").text(ano);
    $('#myModalFecha').modal('hide');

    //mostramos la tabla de asignaciones dado un rango de fecha
    mostrarAsistenciasDadoFechas(fechaAuxInicio,fechaAuxFin);
}
