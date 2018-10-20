from math import sin, cos, sqrt, atan2, radians

def distance_to_event(event_list, longitude, latitude):
    for event in event_list:
        event["distance_to_user"] = distance(event, {"longitude":longitude, "latitude": latitude})

def distance(event, user_location):
    earth_radius = 6373.0

    lat1 = radians(event["latitude"])
    lat2 = radians(user_location["latitude"])
    lon1 = radians(event["longitude"])
    lon2 = radians(user_location["longitude"])

    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (sin(dlat/2))**2 + cos(lat1) * cos(lat2) * (sin(dlon/2))**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return earth_radius * c

def loadFireData():
    fires = []
    with open("./datasets/fires_48h.csv", "r") as f:
        for line in f.readlines()[1:]:
            obj = line.split(',')
            print("LON: {} // LAT: {}".format(obj[0], obj[1]))
            fire = {
                "latitude": float(obj[0]),
                "longitude": float(obj[1]),
                "acq_date": obj[5],
                "acq_time": obj[6],
                "confidence": obj[8],
            }
            fires.append(fire)
    return fires
        
    