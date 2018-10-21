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
            procesarJSON(JSON.stringify(data));
        },
        error: function (xhr, data) {
            console.log("error")
        },
        dataType: 'json',
    });
}

function procesarJSON(data){
    if(data['fire'].length<1){
        sinAlertas();
    }else{
        alertafuegos(data)
    }
}
function sinAlertas(){
    $('#idalerta').txt('Sin Alerta');
    $('#idtiempo').txt('');
    $('#idposición').txt('Tu posición es'+ position)
}

function alertafuegos(fire){
if ([confidence]=="nominal"&& [distance_to_user]<400){
        //hay fuegos
        cambiosfuego(fire['fire'])
        tipsfuego(firetips['fire_tips']);
    }
    
}

function cambiosfuego(fire){
    // CAMBIOS CSS con JQuery
    $('.banner').css({
        'background-image': 'url(../img/fire.jpg)'
    });
    $('body').css({
        'background-color':'#b30000',
    });
    
    $('#idalerta').txt('Alerta por Riesgo de Incendio');
    $('#idtiempo').txt('Registrada en'+[aqc_date]+'a las'+[aqc_time]/60+':'+[aqc_time]%60 );
    $('#idposicion').txt('A'+[distance_to_user]+'Kilómetros')

}

function tipsfuego(tips){
    for(var i=0; i<tips.length;i++){
        $('#tips').append('<li class="list-group-item">'+tips[i]+'</li>');

    }
    
}
