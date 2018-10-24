$(document).ready(function () {
	getLocation();
	setInterval(getLocation, 5000);
})

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser")
	}
}

function showPosition(position) {
	console.log("Latitude: " + position.coords.latitude +
		"<br>Longitude: " + position.coords.longitude);
	updateFromServer(position.coords.latitude, position.coords.longitude, 300);

	if (!$("#map").hasClass("initialized")) {
		initialize_map(position.coords.latitude, position.coords.longitude, 6)
		$("#map").addClass("initialized")
	}
}

function updateFromServer(latitude, longitude, max_distance) {
	$.ajax({
		type: "GET",
		url: "http://155.210.4.106:80/?latitude=" + latitude + "&longitude=" + longitude + "&max_distance=" + max_distance,
		header: {
			"accept": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Header": "*",
			"Access-Control-Allow-Method": "GET, POST, OPTIONS, DELETE, UPDATE",
			"Access-Control-Allow-Credentials": "true"
		},
		success: function (data) {
			console.log((JSON.stringify(data)));
			procesarJSON(data);

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
		if (!$("#map").hasClass("has_points")) {
			
			$("#map").addClass("has_points")
		}
	} else {
		alertafuegos(data['fires'], data['fire_tips'])
		if (!$("#map").hasClass("has_points")) {
			add_fire_points(data["fires"])
			$("#map").addClass("has_points")
		}
	}
}
function sinAlertas() {
	$('#idalerta').html('Sin Alerta');
	$('#idtiempo').html('');
	$('#idposición').html('Tu posición es' + position)
	$('.recommend').hide();
	//$('.mapita').fadeIn(750);
	
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
			$('.recommend').show();
//			$('.mapita').fadeIn(750);
			cambiosfuego(fuego)
			tipsfuego(fire_tips);
		}
	});
}

function cambiosfuego(fire) {
	// CAMBIOS CSS con JQuery
	/*$( "body" ).animate({
		backgroundColor: "#b30000"
	  }, 1000 );
	*/
	$('.banner').css({
		'background-image': 'url(../img/fire.jpg)'
	});
	$('body').css({
		'background-color': '#b30000',
	});

	$('#idalerta').html('Alerta por Riesgo de Incendio');
	$('#idtiempo').html('Registrada en ' + fire['acq_date'] + ' a las ' + Math.floor(fire['acq_time'] / 60) + ':' + fire['acq_time'] % 60);
	$('#idposicion').html('A ' + (fire['distance_to_user']).toFixed(2) + ' Kilómetros');

}

function tipsfuego(tips) {
	var lista = "";
	tips.forEach(tip => {
		lista += '<li class="list-group-item">' + tip + '</li>';
	});
	$('#tips').html(lista);
	
	

}

// MAP FUNCTIONS
var map;
function initialize_map(lat, lon, zoom) {
	map = new ol.Map({
		target: "map",
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM({
					url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
				})
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([lon, lat]),
			zoom: zoom
		})
	});
	add_user_point(lat, lon);
}

function add_fire_points(fires) {
	fires.forEach(fire => {
		add_fire_point(fire["latitude"], fire["longitude"])
	});
}

function add_fire_point(lat, lng) {
	var vectorLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
			})]
		}),
		style: new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 0.5],
				anchorXUnits: "fraction",
				anchorYUnits: "fraction",
				src: "https://cdn0.iconfinder.com/data/icons/fatcow/32/fire.png"
			})
		})
	});
	map.addLayer(vectorLayer);
}

function add_user_point(lat, lng) {
	var vectorLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
			})]
		}),
		style: new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 0.5],
				anchorXUnits: "fraction",
				anchorYUnits: "fraction",
				src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
			})
		})
	});
	map.addLayer(vectorLayer);
}

