# Import flask and datetime module for showing date and time

from flask import Flask, request, jsonify
from flask_cors import CORS
from controller import controller

import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


# Route for seeing a data
@app.route('/data')
def get_time():

    # Returning an api for showing in  reactjs
    return {
        'Name': "geek",
        "Age": "22",
        "Date": x,
        "programming": "python"
        }


@app.route('/search_inputs', methods=['POST', 'OPTIONS'])
def search_inputs():
    headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

    if request.method == 'OPTIONS':
        return '', 200, headers

    data = request.get_json()

    departure_location = data['from']
    destination_location = data['to']
    depart_date = data['departDate']

    processed_data = controller(departure_location,
                                destination_location,
                                depart_date)

    flight_list = []
    for flight in processed_data:
        flight_dict = {
            'origin': flight.origin,
            'dest': flight.dest,
            'dept_time': flight.dept_time,
            'arr_time': flight.arr_time,
            'duration': flight.duration,
            'price': flight.price,
            'number': flight.number
        }
        flight_list.append(flight_dict)
    return jsonify(flight_list), 302, headers


# Running app
if __name__ == '__main__':
    app.run(debug=True)
