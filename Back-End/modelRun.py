import os
import sys
import time
from pathlib import Path
import gc
import datetime
import numpy as np
from folium.plugins import Draw
from keras.models import load_model
from PIL import Image
from datetime import datetime
import cv2
import rasterio

module_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "src"))
if module_path not in sys.path:
    sys.path.append(module_path)

from src.predict import get_smooth_prediction_for_file
from src.utils import prepare_split_image

white = (255, 255, 255)
red = (255, 0, 0)
blue = (0, 255, 0)
green = (0, 0, 255)
gray = (128, 128, 128)

CLASS_LABELS = {
    0: ("Not classified", (255, 255, 255)),  # White
    1: ("Buildings", (255, 0, 0)),           # Red
    2: ("Greenery", (0, 255, 0)),               # Green
    3: ("Water", (0, 0, 255)),            # Blue
    4: ("Roads", (128, 128, 128)),           # Gray
}

MODELS = {
    "ResNET34-25": {
        "description": "ResNet-34-Epoch-25",
        "file_name": "landcover_resnet34_25_epochs_batch16_freeze.hdf5",
        "backbone": "resnet34",
    },
    "ResNET34-50": {
        "description": "ResNet-34-Epoch-50",
        "file_name": "landcover_resnet34_50_epochs_batch16_freeze.hdf5",
        "backbone": "resnet34",
    },
    "ResNET34-75": {
        "description": "ResNet-34-Epoch-75",
        "file_name": "landcover_resnet34_75_epochs_batch16_freeze.hdf5",
        "backbone": "resnet34",
    },
    "ResNET34-100": {
        "description": "ResNet-34-Epoch-100",
        "file_name": "landcover_resnet34_100_epochs_batch16_freeze.hdf5",
        "backbone": "resnet34",
    },
    "ResNET50-25": {
        "description": "ResNet-50-Epoch-25",
        "file_name": "landcover_resnet50_25_epochs_batch16_freeze.hdf5",
        "backbone": "resnet50",
    },
    "ResNET50-50": {
        "description": "ResNet-50-Epoch-50",
        "file_name": "landcover_resnet50_50_epochs_batch16_freeze.hdf5",
        "backbone": "resnet50",
    },
    "ResNET50-75": {
        "description": "ResNet-50-Epoch-75",
        "file_name": "landcover_resnet50_75_epochs_batch16_freeze.hdf5",
        "backbone": "resnet50",
    },
    "ResNET50-100": {
        "description": "ResNet-50-Epoch-100",
        "file_name": "landcover_resnet50_100_epochs_batch16_freeze.hdf5",
        "backbone": "resnet50",
    },
    "ResNET101-25": {
        "description": "ResNet-101-Epoch-25",
        "file_name": "landcover_resnet101_25_epochs_batch16_freeze.hdf5",
        "backbone": "resnet101",
    },
    
    "ResNET101-50": {
        "description": "ResNet-101-Epoch-50",
        "file_name": "landcover_resnet101_50_epochs_batch16_freeze.hdf5",
        "backbone": "resnet101",
    },
    
    "ResNET101-75": {
        "description": "ResNet-101-Epoch-75",
        "file_name": "landcover_resnet101_75_epochs_batch16_freeze.hdf5",
        "backbone": "resnet50",
    },
    "ResNET101-100": {
        "description": "ResNet-101-Epoch-100",
        "file_name": "landcover_resnet101_100_epochs_batch16_freeze.hdf5",
        "backbone": "resnet101",
    },
}

def load_model_from_huggingface(repo_id, filename):
    try:
        from huggingface_hub import hf_hub_download

        model_path = hf_hub_download(
            repo_id=repo_id,
            filename=filename,
            cache_dir="../models"
        )
        model = load_model(model_path, compile=False)
        return model
    except Exception as e:
        print("Error loading model from Hugging Face")
        return None

def show_prediction(image_path, selected_model):
    #
    # Get and show the prediction for a given image with class labels.
    #
    # Read image
    with rasterio.open(image_path) as dataset:
        img_array = dataset.read()

    # Move channel information to third axis
    img_array = np.moveaxis(img_array, source=0, destination=2)

    # Load model
    # model = load_model_from_file(Path("../Models/", MODELS[selected_model]["file_name"]))
    model = load_model_from_huggingface("debasishray16/satellite_image_segmentation_ResNet_Models", MODELS[selected_model]["file_name"])

    # Get prediction
    prediction = get_smooth_prediction_for_file(img_array, model, 5, MODELS[selected_model]["backbone"], patch_size=256)

    # Convert prediction into a color-mapped image
    color_mapped = np.zeros((*prediction.shape, 3), dtype=np.uint8)

    for class_idx, (label, color) in CLASS_LABELS.items():
        color_mapped[prediction == class_idx] = color

    # Convert to PIL Image
    segmented_img = Image.fromarray(color_mapped)

    # Overlay segmentation on original image
    overlay = cv2.addWeighted(img_array.astype(np.uint8), 0.6, color_mapped, 0.4, 0)

    
    
    # Save segmented image
    save_segmented_file(segmented_img, image_path, selected_model)

    gc.collect()
    return img_array, segmented_img, overlay

def load_model_from_file(model_path):
    """ Load a model from a file, ensuring it exists first. """
    
    model_file = Path(model_path)
    
    if not model_file.exists():
        print(f"Current working directory: {os.getcwd()}")
        print(f" Model file not found: {model_path}")
        return None  # Prevents the app from crashing

    try:
        model = load_model(model_path, compile=False)
        return model
    except Exception as e:
        print(f" Error loading model: {e}")
        return None


def save_segmented_file(segmented_img, source_path, selected_model):
    """Save a segmented image to a png file."""
    segmented_png_path = (
        source_path.parent.parent
        / "prediction"
        / f"{source_path.stem}_{selected_model}.png"
    )

    # Make sure image path exists
    Path(segmented_png_path).parent.mkdir(parents=True, exist_ok=True)
    print(segmented_png_path)

    segmented_img.save(segmented_png_path)


def process_image(selectedModel):
    """Process an image from the uploads folder and feed it to the selected model."""
    uploads_dir = Path("../uploads/")
    image_name = "temp_image.png"  # This should be the name of the uploaded image
    models_dir = Path("../Models")
    uploads_dir.mkdir(parents=True, exist_ok=True)  # Ensure the uploads directory exists

    # Get the model details from the MODELS dictionary
    model_details = MODELS.get(selectedModel)
    if not model_details:
        print(f"Error: Model '{selectedModel}' not found in MODELS dictionary.")
        return

    model_file_name = model_details["file_name"]
    model_path = models_dir / model_file_name
    backbone = model_details["backbone"]
    n_classes = len(CLASS_LABELS)

    # Load the model
    # model = load_model_from_file(model_path)
    model = load_model_from_huggingface("debasishray16/satellite_image_segmentation_ResNet_Models", MODELS[selectedModel]["file_name"])
    
    if model is None:
        print("Error: Model could not be loaded.")
        return

    input_file_path = uploads_dir / image_name

    # Check if the file exists
    if not input_file_path.exists():
        print(f"Current working directory: {os.getcwd()}")
        print(f"Error: File '{image_name}' not found in uploads folder.")
        return

    # Convert PNG and JPEG to TIFF format if necessary
    if image_name.lower().endswith(("png", "jpg", "jpeg")):
        temp_tif_path = input_file_path.with_suffix(".tif")
        img = Image.open(input_file_path)
        img = img.convert("RGB")
        img.save(temp_tif_path)
        input_file_path = temp_tif_path

    # Prepare the image for segmentation
    with rasterio.open(input_file_path) as src:
        img_array = src.read()

    # Move channel information to the third axis
    img_array = np.moveaxis(img_array, source=0, destination=2)

    # Perform segmentation
    try:
        img, segmented_img, overlay = show_prediction(
            input_file_path, selectedModel
        )

        # Save the segmented image
        save_segmented_file(segmented_img, input_file_path, selectedModel)

        print("Segmentation completed successfully.")
    except Exception as e:
        print(f"Error during segmentation: {e}")
