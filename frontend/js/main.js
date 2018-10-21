
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

