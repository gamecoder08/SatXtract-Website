from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
from modelRun import process_image
from gee_utils import fetch_map_uhi

selectedModel = None
latitude = None
longitude = None
zoom_z = None
start_date = None
end_date = None
map_corners = None

app = Flask(__name__)
CORS(app)

@app.route('/api/mapdata', methods=['POST'])
def mapdata():
    global latitude, longitude, zoom_z, map_corners
    data = request.get_json()
    latitude = data.get('lat')
    longitude = data.get('lon')
    zoom_z = data.get('zoom')
    map_corners = data.get('mapCorners')

    # Process the data as needed
    print(f"Received data: lat={latitude}, lon={longitude}, zoom={zoom_z}, mapCorners={map_corners}")

    return jsonify({"message": "Data received successfully"})

@app.route('/api/selectModel', methods=['POST'])
def select_model():
    global selectedModel
    data = request.get_json()
    selectedModel = data.get('model')
    print(f"Selected model: {selectedModel}")
    if not selectedModel:
        return jsonify({"error": "No model provided"}), 400
    return jsonify({"message": "Model received successfully"}), 200

@app.route('/api/runModel', methods=['POST'])
def run_model():
    global selectedModel
    if not selectedModel:
        print("Error: No model selected")
        return jsonify({"error": "No model selected. Please select a model first."}), 400
    
    print(f"Running model: {selectedModel}")

    # Call the function to process the image with the selected model
    process_image(selectedModel)

    

    # Return the file paths
    return jsonify({
        "message": f"Model ran successfully!",
    }), 200
    
@app.route('/api/getResults', methods=['GET'])
def get_results():
    print("getResults endpoint called")
    # Return the results (e.g., image paths)
    global selectedModel
    # After segmentation, construct the paths for the initial and predicted images
    uploads_dir = os.path.abspath("./uploads")
    predictions_dir = os.path.abspath("./prediction")

    # Paths to the initial and predicted images
    sanitized_model_name = "_".join(selectedModel.split())
    initial_image_path = os.path.join(uploads_dir, f"temp_image.png")
    predicted_image_name = f"temp_image_{sanitized_model_name}.png"
    predicted_image_path = os.path.join(predictions_dir, predicted_image_name)
    
    print(f"Initial image path: {initial_image_path}")
    print(f"Predicted image path: {predicted_image_path}")

    # Check if the files exist
    if not os.path.exists(initial_image_path) or not os.path.exists(predicted_image_path):
        print("Error: Images not found")
        return jsonify({"error": "Images not found"}), 404
    
    return jsonify({
        "initial_image": f"/uploads/temp_image.png",
        "predicted_image": f"/prediction/{predicted_image_name}"
    }), 200
    
# Serve static files from the uploads directory
@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    uploads_dir = os.path.abspath("./uploads")
    return send_from_directory(uploads_dir, filename)

# Serve static files from the prediction directory
@app.route('/prediction/<path:filename>')
def serve_predictions(filename):
    predictions_dir = os.path.abspath("./prediction")
    return send_from_directory(predictions_dir, filename)

@app.route('/api/datedata', methods=['POST'])
def datedata():
    global start_date, end_date, latitude, longitude, zoom_z, map_corners
    data = request.get_json()
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    
    # Parse and format the dates
    start_date_formatted = datetime.fromisoformat(start_date).strftime('%Y-%m-%d')
    end_date_formatted = datetime.fromisoformat(end_date).strftime('%Y-%m-%d')

    # Process the data as needed
    print(f"Received date data: start_date={start_date_formatted}, end_date={end_date_formatted},latitude={latitude}, longitude={longitude}, zoom={zoom_z}")
    # Round latitude and longitude to 4 decimal places
    if latitude is not None:
        latitude = round(float(latitude), 4)
    if longitude is not None:
        longitude = round(float(longitude), 4)
    print(f"Received date data: start_date={start_date_formatted}, end_date={end_date_formatted},latitude={latitude}, longitude={longitude}, zoom={zoom_z}")
    
    
    map_data = fetch_map_uhi(map_corners, zoom_z, start_date, end_date)
    
    print(map_data)

    return jsonify({
    "message": "Date data received successfully",
    "map_data": map_data,
    "latitude": latitude,
    "longitude": longitude,
}), 200

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if file:
        file_path = os.path.join(UPLOAD_FOLDER, f"temp_image.png")
        print(file_path)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200

if __name__ == '__main__':
    app.run(debug=True,use_reloader=False)