from flask import Flask, request, jsonify

from datasets import loadFireData
from datasets import distance_to_event

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"message": "Error, could not found!"}), 404

@app.route("/", methods=["GET"])
def home():
    latitude = float(request.args.get('latitude'))
    longitude = float(request.args.get('longitude'))
    fires = loadFireData()
    # return jsonify({
    #     "message": "Everything allritght!",
    #     "location":location
    # })
    distance_to_event(fires, longitude, latitude)
    return jsonify(fires)


# 41.659636, -0.907556
if __name__ == "__main__":
    app.run()
