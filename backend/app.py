from flask import Flask, request, jsonify, Response

from datasets import load_fire_data, closer_fires_in
from datasets import distance_to_event

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"message": "Error, could not found!"}), 404

@app.route("/", methods=["GET"])
def home():
    # Get get parameters
    latitude = float(request.args.get('latitude'))
    longitude = float(request.args.get('longitude'))
    max_distance = float(request.args.get('max_distance'))

    print("Latitude: {} // Longitude: {} // Max_distance: {}".format(latitude, longitude, max_distance))

    # Get the fire data
    fires = load_fire_data()

    # Get distance between the user location and the fires
    distance_to_event(fires, longitude, latitude)

    # Get all the fires in max_distance radius    
    closer_fires = closer_fires_in(fires, max_distance)

    # Needed to add header
    resp = jsonify(closer_fires)
    resp.headers['Access-Control-Allow-Origin'] = "*"
    resp.headers['Access-Control-Allow-Header'] = "*"
    resp.headers['Access-Control-Allow-Method'] = "GET, POST, OPTIONS, DELETE, UPDATE"
    

    resp.headers["Content-Type"] = "application/json"

    
    # return jsonify(closer_fires), 200
    return resp


# Current location 41.659636, -0.907556
if __name__ == "__main__":
    print("Server running...")
    app.run(host='0.0.0.0')    