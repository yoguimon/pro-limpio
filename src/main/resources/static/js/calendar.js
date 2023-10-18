var fechaAuxInicio, fechaAuxFin;
var horaAuxIni,horaAuxFin;
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
$(document).ready(function() {
 iniciarFechaYHora();
  $('#myModalFecha').on('show.bs.modal', function() {
         fechaAuxInicio = $("#datepickerInicio").datepicker("getDate");
         fechaAuxFin = $("#datepickerFin").datepicker("getDate");
     });
     $('#myModalHora').on('show.bs.modal', function() {
              horaAuxIni=document.getElementById("txthoraInicio").value;
              horaAuxFin=document.getElementById("txthoraFin").value;
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

	var ahora = new Date();
    var hora = ahora.getHours();
    var minuto = ahora.getMinutes();

    // Asegúrate de que los minutos siempre tengan dos dígitos
    if (minuto < 10) {
        minuto = "0" + minuto;
    }

    document.getElementById("horaIni").innerHTML = hora+" :";
    document.getElementById("horaFin").innerHTML = hora+" :";
    document.getElementById("minutoIni").innerHTML = minuto;
    document.getElementById("minutoFin").innerHTML = minuto;
    document.getElementById("txthoraInicio").value = hora + ":" + minuto;
    document.getElementById("txthoraFin").value = hora + ":" + minuto;

    // Establecer valores por defecto de los datepickers
    $(function () {
        $("#datepickerInicio").datepicker().datepicker("setDate", new Date());
    });

    $(function () {
        $("#datepickerFin").datepicker().datepicker("setDate", new Date());
    });
}
function mostarModalHora(){
    $('#myModalHora').modal('show');
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
    var mes = dateIni.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0
    var ano = dateIni.getFullYear();

    $("#dia").text(dia);
    $("#mes").text(mes);
    $("#ano").text(ano);

    dia = dateFin.getDate();
    mes = dateFin.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0
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
function horaEsValida(){
    var horaIni=document.getElementById("txthoraInicio").value;
    var horaFin=document.getElementById("txthoraFin").value;
    var horaIniPartes = horaIni.split(":");
    var horaFinPartes = horaFin.split(":");

    var horaIniNum = parseInt(horaIniPartes[0]);
    var horaFinNum = parseInt(horaFinPartes[0]);

    if ((horaIniNum >= 8 && horaIniNum <= 12 || horaIniNum >= 13 && horaIniNum <= 16) &&
        (horaFinNum >= 8 && horaFinNum <= 12 || horaFinNum >= 13 && horaFinNum <= 16)) {
        if (horaIniNum < horaFinNum) {
            horaAuxIni=horaIni;
            horaAuxFin=horaFin;
            return true;
        } else {
            $("#formAlertaTotal .modal-body").text("La hora inicio de trabajo debe ser menor a la hora fin.");
            $("#formAlertaTotal").modal("show");
            return false;
        }
    } else {
        $("#formAlertaTotal .modal-body").text("debes escoger horarios de trabajo! de 8 a 12 y de 13 a 17.");
        $("#formAlertaTotal").modal("show");
        return false;
    }
}