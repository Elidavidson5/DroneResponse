from flask import Flask, jsonify, request
from flask_cors import CORS
# Install pymavlink if you haven't already: pip install pymavlink
from pymavlink import mavutil


app = Flask(__name__)
CORS(app)

# Global variable to store telemetry data
telemetry_data = {}


# drone = mavutil.mavlink_connection('udp:xxx.xxx.x.x:xxxxx')

""" 
@app.route('/connect-drone', methods=['GET'])
def connect_drone():
    try:
        drone.wait_heartbeat(timeout=30)
        return jsonify({"message": "Connected", "heartbeat": True})
    except Exception as e:
        return jsonify({"error": f"Failed Connection: {e}"}), 500


@app.route('/get-drone-status', methods=['GET'])
def get_drone_status():
    try:
        battery = drone.recv_match(type='BATTERY_STATUS', blocking=True)
        if battery:
            return jsonify({
                "battery_remaining": battery.battery_remaining,
            })
        else:
            return jsonify({"error": "Unable to retrieve battery status"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to get drone status: {e}"}), 500


@app.route('/get-info', methods=['GET'])
def get_info():
    try:
        telemetry = drone.recv_match(
            type=['GLOBAL_POSITION_INT', 'ATTITUDE'], blocking=True)
        if telemetry:
            data = {}
            if telemetry.get_type() == 'GLOBAL_POSITION_INT':
                data['altitude'] = telemetry.alt / 1000.0  # in meters
                data['latitude'] = telemetry.lat / 1e7
                data['longitude'] = telemetry.lon / 1e7
            elif telemetry.get_type() == 'ALTTITUDE':
                data['pitch'] = telemetry.pitch
                data['roll'] = telemetry.roll
                data['yaw'] = telemetry.yaw
            return jsonify(data)
        else:
            return jsonify({"error": "Unable to retrieve telemetry data"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to get telemetry info: {e}"}), 500


@app.route('/send-waypoints', methods=['POST'])
def send_waypoints(waypoints):
    
    print('here')

    try:
        waypoints = request.json
        if not waypoints:
            return jsonify({"error": "No waypoints provided"}), 400

        for wp in waypoints:
            drone.mav.mission_item_send(
                drone.target_system,
                drone.target_component,
                wp['seq'],
                wp.get('frame', 3),  # Default MAV_FRAME_GLOBAL_RELATIVE_ALT
                wp.get('command', 16),  # Default MAV_CMD_NAV_WAYPOINT
                wp.get('current', 0),
                wp.get('autocontinue', 1),
                wp['param1'], wp['param2'], wp['param3'], wp['param4'],
                wp['x'], wp['y'], wp['z']
            )
        return jsonify({"message": "Waypoints uploaded successfully"})
    except Exception as e:
        return jsonify({"error": f"Failed to set waypoints: {e}"}), 500


@app.route('/start-flight', methods=['GET'])
def start_mission():
    try:
        drone.mav.command_long_send(
            drone.target_system,
            drone.target_component,
            mavutil.mavlink.MAV_CMD_MISSION_START,
            0,  # confirmation
            0, 0, 0, 0, 0, 0, 0
        )
        return jsonify({"message": "Autonomous flight started"})
    except Exception as e:
        return jsonify({"error": f"Failed to start flight: {e}"}), 500


@app.route('/get-waypoints', methods=['GET'])
def get_waypoints():
    try:
        # Request the list of mission items from the drone
        drone.mav.mission_request_list_send(
            drone.target_system, drone.target_component)

        waypoints = []
        while True:
            message = drone.recv_match(
                type=['MISSION_ITEM', 'MISSION_COUNT'], blocking=True, timeout=10)
            if not message:
                break

            if message.get_type() == 'MISSION_COUNT':
                print(f"Mission Count: {message.count}")
                continue  # `MISSION_COUNT` informs how many waypoints are expected

            if message.get_type() == 'MISSION_ITEM':
                waypoint = {
                    "seq": message.seq,
                    "frame": message.frame,
                    "command": message.command,
                    "current": message.current,
                    "autocontinue": message.autocontinue,
                    "param1": message.param1,
                    "param2": message.param2,
                    "param3": message.param3,
                    "param4": message.param4,
                    "x": message.x,
                    "y": message.y,
                    "z": message.z
                }
                waypoints.append(waypoint)

        if waypoints:
            return jsonify({"waypoints": waypoints})
        else:
            return jsonify({"message": "No waypoints found"}), 404
    except Exception as e:
        return jsonify({"error": f"Failed to retrieve waypoints: {e}"}), 500


@app.route('/abort', methods=['GET'])
def abort_mission():
    try:
        # Set mode to RTL (Return to Launch)
        drone.set_mode('RTL')
        return jsonify({"message": "Mission aborted. Returning to home"})
    except Exception as e:
        return jsonify({"error": f"Failed to abort mission: {e}"}), 500
 """

#temp api routes and functions
#above functions will be used

@app.route('/send-waypoints', methods=['POST'])
def get_waypoints():
    try:
        waypoints = request.json
        print('Received waypoints:', waypoints)

        return jsonify({"message": f"{len(waypoints)} Waypoints uploaded successfully"})
    except Exception as e:
        print(f"Error processing waypoints: {e}")
        return jsonify({"error": f"Failed to process waypoints: {e}"}), 500


@app.route('/connect-drone', methods=['GET'])
def connect_drone():
    try:
        # drone.wait_heartbeat(timeout=30)
        return jsonify({"message": "Connected", "heartbeat": True})
    except Exception as e:
        return jsonify({"error": f"Failed Connection: {e}"}), 500


@app.route('/ml-models', methods=['POST'])
def ml_models():
    try:
        model_types = ['Human', 'Heat']
        models = request.get_json()  # Use get_json() to parse JSON

        selected_models = []

        for model_options, selected in zip(model_types, models):
            if selected:
                selected_models.append(model_options)
        print('Running backend on models:', selected_models)
        return jsonify({"message": "Models received successfully", "models": selected_models}), 200
    except Exception as e:
        print('Error receiving models:', e)
        return jsonify({"error": "Failed to process models", "details": str(e)}), 400


@app.route('/upload-flightmodes', methods=['POST'])
def upload_flightModes():
    try:
        data = request.json
        flightModes = data['flightModes']
        checkedModes = data['checkedStates']
        modes = []
        for item, checked in zip(flightModes, checkedModes):
            row = {}
            if item is None:
                item = 'Manual'
            row['mode'] = item
            row['simple'] = checked
            modes.append(row)

        # next is to upload the flight modes to the drone

        return jsonify({'message': 'Flight modes uploaded to drone'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'failed to upload flight modes'}), 500


@app.route('/upload-params', methods=['POST'])
def upload_params():
    try:
        data = request.json

        print('data', data)
        return jsonify({'message': 'Full Parameters List uploaded to drone'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'failed to upload Full Parameter List'}), 500


@app.route('/abort-mission', methods=['GET'])
def abort_mission():
    try:

        print('mission aborted')
        return jsonify({'message': 'Mission Aborted'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'failed to abort mission'}), 500
    
@app.route('/start-mission', methods=['GET'])
def start_mission():
    try:

        print('mission started')
        return jsonify({'message': 'Mission Started'})
    except Exception as e:
        print(e)
        return jsonify({'message': 'failed to start mission'}), 500



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=4000)
