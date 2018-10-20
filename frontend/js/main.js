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
