from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
# from gee_utils import fetch_map_data

app = Flask(__name__)
CORS(app)

@app.route('/api/mapdata', methods=['POST'])
def mapdata():
    data = request.get_json()
    latitude = data.get('lat')
    longitude = data.get('lon')
    zoom_z = data.get('zoom')

    # Process the data as needed
    print(f"Received data: lat={latitude}, lon={longitude}, zoom={zoom_z}")

    return jsonify({"message": "Data received successfully"})

@app.route('/api/datedata', methods=['POST'])
def datedata():
    data = request.get_json()
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    latitude = data.get('lat')
    longitude = data.get('lon')
    zoom_z = data.get('zoom')
    
    # Parse and format the dates
    start_date_formatted = datetime.fromisoformat(start_date).strftime('%Y-%m-%d')
    end_date_formatted = datetime.fromisoformat(end_date).strftime('%Y-%m-%d')

    # Process the data as needed
    print(f"Received date data: start_date={start_date_formatted}, end_date={end_date_formatted}")
    
    # map_data = fetch_map_data(latitude, longitude, zoom_z, start_date, end_date)

    return jsonify({"message": "Date data received successfully"})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if file:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200

if __name__ == '__main__':
    app.run(debug=True)