var fechaAuxInicio, fechaAuxFin;
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
$(document).ready(function() {
 iniciarFechaYHora();
  $('#myModalFecha').on('show.bs.modal', function() {
         fechaAuxInicio = $("#datepickerInicio").datepicker("getDate");
         fechaAuxFin = $("#datepickerFin").datepicker("getDate");
     });
});
function iniciarFechaYHora(){
    // definir que se vai criar um objeto data
    var data = new Date();
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

function seleccionarHora(texto) {
    if(texto==="cancelar"){
        document.getElementById("txthoraInicio").value=horaAuxIni;
        document.getElementById("txthoraFin").value=horaAuxFin;
        $('#myModalHora').modal('hide');
        return;
    }
    var horaSeleccionada = document.getElementById("txthoraInicio").value;
    var horaDiv = document.getElementById("horaIni");
    var minutoDiv = document.getElementById("minutoIni");
    var horaMinuto = horaSeleccionada.split(":");
    horaDiv.innerText = horaMinuto[0]+" :";
    minutoDiv.innerText = horaMinuto[1];

    horaSeleccionada = document.getElementById("txthoraFin").value;
    horaDiv = document.getElementById("horaFin");
    minutoDiv = document.getElementById("minutoFin");
    horaMinuto = horaSeleccionada.split(":");
    horaDiv.innerText = horaMinuto[0]+" :";
    minutoDiv.innerText = horaMinuto[1];

    $('#myModalHora').modal('hide');
}
function fechaEsValida(){
    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    var fechaIni = $("#datepickerInicio").datepicker("getDate");
    fechaIni.setHours(0, 0, 0, 0);
    var fechaFin = $("#datepickerFin").datepicker("getDate");
    fechaFin.setHours(0, 0, 0, 0);
    if(fechaIni.getTime() < fechaActual.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser anterior a la fecha actual");
        $("#formAlertaTotal").modal("show");
        return false;
    }
    if(fechaFin.getTime() < fechaIni.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de finalización no puede ser anterior a la fecha de inicio");
        $("#formAlertaTotal").modal("show");
        return false;
    }
    if(fechaIni.getTime() > fechaFin.getTime()) {
        $("#formAlertaTotal .modal-body").text("La fecha de inicio no puede ser posterior a la fecha de finalización");
        $("#formAlertaTotal").modal("show");
        return false;
    }
    fechaAuxInicio=fechaIni;
    fechaAuxFin=fechaFin;
    return true;

}
