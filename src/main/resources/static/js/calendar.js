$(document).ready(function() {
 iniciarFechaYHora();
});
function iniciarFechaYHora(){
    // definir que se vai criar um objeto data
    var data = new Date();
	// aparecer no ecrã o dia do mês
	document.getElementById("dia").innerHTML = data.getDate();
	document.getElementById("diaFin").innerHTML = data.getDate();
	// definir os meses
	var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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

$( function() {
            $( "#datepickerInicio" ).datepicker();
        });
$( function() {
            $( "#datepickerFin" ).datepicker();
        });
}


        function seleccionarFecha() {
        //$('#myModal').modal('hide');
            var date = $("#datepickerInicio").datepicker("getDate");
            var dia = date.getDate();
            var mes = date.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0
            var ano = date.getFullYear();

            $("#dia").text(dia);
            $("#mes").text(mes);
            $("#ano").text(ano);

            date = $("#datepickerFin").datepicker("getDate");
            dia = date.getDate();
            mes = date.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0
            ano = date.getFullYear();

            $("#diaFin").text(dia);
            $("#mesFin").text(mes);
            $("#anoFin").text(ano);


        }

        function seleccionarHora() {
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
            }