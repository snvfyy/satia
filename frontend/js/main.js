<<<<<<< Updated upstream
	var location;
	var latitude;
	var longitude;
	var max_distance = 300;
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log ("Geolocation is not supported by this browser.");
		}
	}
	function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude +
		"Longitude: " + position.coords.longitude);
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	}
	
/*var configuracion = {
	latitude: Latitude,
	longitude: Longitude,
	max_distance: 5000,
}*/
$(".boton-gordo").click(function(){
	alert("cosas");
	$.ajax({

		type: "GET",
		dataType: 'jsonp',
		headers: {
			'Access-Control-Allow-Origin': '*',
			"Access-Control-Allow-Method": "GET,POST,UPDATE,OPTIONS,DELETE",
			"Access-Control-Allow-Headers": '*'
		},
		url: 'http://127.0.0.1:5000/?latitude='+latitude+'&longitude='+longitude+'&max_distance='+max_distance,
		
		success: function(respuesta) {
	
			console.log("log:"+respuesta);
	
		},
	
		error: function(result) {
	
			console.log(result);
	
		}
	
	});
	console.log(latitude+"   "+longitude);
})
=======
$(document).ready(function () {
	getLocation();
	setInterval(getLocation, 5000);
})

function getLocation() {
	// if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);

	// } else {
	// 	console.log("Geolocation is not supported by this browser.");
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
		},
		error: function (xhr, data) {
			console.log("error")
		},
		dataType: 'json',
	});
}
>>>>>>> Stashed changes
