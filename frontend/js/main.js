	var location;
				function getLocation() {
				    if (navigator.geolocation) {
				        navigator.geolocation.getCurrentPosition(showPosition);
				    } else {
				       console.log ("Geolocation is not supported by this browser.");
				    }
				}
				function showPosition(position) {
				    console.log("Latitude: " + position.coords.latitude +
				    "<br>Longitude: " + position.coords.longitude);
				}
	
	function cambiar_fondo_con_style(colorsel){
		var color = document.getElementById(colorsel).style.backgroundColor;
		document.body.style.backgroundColor= color;
		}