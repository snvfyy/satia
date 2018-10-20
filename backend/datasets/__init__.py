from math import sin, cos, sqrt, atan2, radians
import requests
import json

def distance_to_event(event_list, longitude, latitude):
    """ Calculate the distance between the point {longitude, latitude} and every
    event in event_list """
    for event in event_list:
        event["distance_to_user"] = distance(event, {"longitude":longitude, "latitude": latitude})

def distance(event, user_location):
    """ Calculate the distance between tho coordinates 
        Both event and user_location has to have location and latitude
    """
    earth_radius = 6373.0

    lat1 = radians(event["latitude"])
    lat2 = radians(user_location["latitude"])

    dlat = radians(user_location["latitude"] - event["latitude"])
    dlon = radians(user_location["longitude"] - event["longitude"])

    a = (sin(dlat/2))**2 + cos(lat1) * cos(lat2) * (sin(dlon/2))**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return earth_radius * c    

def closer_fires_in(fires, max_distance):
    """ Returns the fires who are in the max_distance radius, also appends a field
    with the fire direction based on the wind direction """
    closer_fires = []
    for fire in fires:
        if fire["distance_to_user"] < max_distance:
            # fire["direction"] = wind_direction(fire["latitude"], fire["longitude"])
            closer_fires.append(fire)
    return closer_fires

def load_fire_data():
    """ Loads fires from the fire dataset """
    fires = []
    with open("./datasets/fires_24h.csv", "r") as f:
        # Iterate over all the lines skipping the header line
        for line in f.readlines()[1:]:
            fire = line.split(',')            
            fire = {
                "latitude": float(fire[0]),
                "longitude": float(fire[1]),
                "acq_date": fire[5],
                "acq_time": fire[6],
                "confidence": fire[8],
            }
            fires.append(fire)
    return fires

def wind_direction(latitude, longitude):
    """ Gets the wind direction of a point from OpenWeatherMap api """
    url = "http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=14f9aa24a9dd496142f03c49211a1c24"
    url = url.format(latitude=latitude, longitude=longitude)
    print("Requesting: {}".format(url))
    headers = {
        "cache-control": "no-cache"
    }

    response = requests.request("GET", url, headers=headers)    
    
    return json.loads(response.text)["wind"]
        
    