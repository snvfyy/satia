$(document).ready(function () {
	getLocation();
	setInterval(getLocation, 5000);
})

function getLocation() {
	// if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);

	// } else {
	//  console.log("Geolocation is not supported by this browser.");
	// }
}

function showPosition(position) {
	console.log("Latitude: " + position.coords.latitude +
		"<br>Longitude: " + position.coords.longitude);
	updateFromServer(position.coords.latitude, position.coords.longitude, 300);

}

function updateFromServer(latitude, longitude, max_distance) {
	$.ajax({
		type: "GET",
		url: "http://localhost:5000/?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=" + max_distance,
		header: {
			"accept": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Header": "*",
			"Access-Control-Allow-Method": "GET, POST, OPTIONS, DELETE, UPDATE",
			"Access-Control-Allow-Credentials": "true"
		},
		success: function (data) {
			console.log((JSON.stringify(data)));
			if (data) {
				procesarJSON(data);
			}

		},
		error: function (xhr, data) {
			console.log("error")
		},
		dataType: 'json',
	});
}


function procesarJSON(data) {
	console.log(data);
	if (data['fires'].length < 1) {
		sinAlertas();
	} else {
		alertafuegos(data['fires'], data['fire_tips'])
	}
}
function sinAlertas() {
	$('#idalerta').html('Sin Alerta');
	$('#idtiempo').html('');
	$('#idposición').html('Tu posición es' + position)
}

function alertafuegos(fires, fire_tips) {
	var hayAlerta = false;
	var fuego = null;
	fires.forEach(fire => {
		if (fire['confidence'] == "nominal" && fire['distance_to_user'] < 400) {
			//hay fuegos
			hayAlerta = true;
			fuego = fire;

		}
		if (hayAlerta) {
			cambiosfuego(fuego)
			tipsfuego(fire_tips);
		}
	});


}

function cambiosfuego(fire) {
	// CAMBIOS CSS con JQuery
	$('.banner').css({
		'background-image': 'url(../img/fire.jpg)'
	});
	$('body').css({
		'background-color': '#b30000',
	});

	$('#idalerta').html('Alerta por Riesgo de Incendio');
	$('#idtiempo').html('Registrada en ' + fire['acq_date'] + ' a las ' + Math.floor(fire['acq_time'] / 60)+ ':' + fire['acq_time'] % 60);
	$('#idposicion').html('A ' + (fire['distance_to_user']).toFixed(2) + ' Kilómetros');

}

function tipsfuego(tips) {
	var lista = "";
	tips.forEach(tip => {
		lista += '<li class="list-group-item">' + tip + '</li>';
	});
	$('#tips').html(lista);

}





