import ee
import geemap
import google.auth
from google.oauth2 import service_account
# Initialize Earth Engine


# Replace with your service account email and the path to your key file
service_account_email = 'satxtract-service@satxtract.iam.gserviceaccount.com'
# key_file = '/mnt/d/DevFx Hub/Programming/Projects/SatXtract-website/Back-End/satxtract-412cba70a931.json'
key_file = '../Back-End/satxtract-412cba70a931.json'

# # Define the required scopes
# scopes = ['https://www.googleapis.com/auth/earthengine']

# Create credentials using the service account and scopes
credentials = service_account.Credentials.from_service_account_file(
    '../Back-End/satxtract-412cba70a931.json',
    scopes=['https://www.googleapis.com/auth/cloud-platform']
)

try:
    ee.Initialize(credentials,project='satxtract')
except Exception as e:
    print(f"Error initializing Earth Engine: {e}")
    
    
# try:
#     ee.Initialize(project='satxtract')
# except Exception as e:
#     ee.Authenticate()
#     ee.Initialize(project='satxtract')

def get_map_url(image, vis_params):
    """Generate a map URL from an EE image and write map_id to a text file."""
    map_id = image.getMapId(vis_params)
    print(map_id)

    return f"https://earthengine.googleapis.com/map/{map_id['mapid']}/{{z}}/{{x}}/{{y}}"
    
def fetch_map_with_geemap(polygon_coords, zoom, start_date, end_date):
    """Fetch Normal, LSE, LST, and NDVI maps using geemap."""
    try:
        zoom = zoom + 2
        # Convert polygon coordinates to an Earth Engine geometry
        polygon = ee.Geometry.Polygon(polygon_coords)

        # Define date range
        start_date_ee = ee.Date(start_date)
        end_date_ee = ee.Date(end_date)

        # Sentinel-2 surface reflectance
        sentinel = (ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
                    .filterBounds(polygon)
                    .filterDate(start_date_ee, end_date_ee)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                    .median())

        # LANDSAT for thermal + LST
        landsat = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
                   .filterBounds(polygon)
                   .filterDate(start_date_ee, end_date_ee)
                   .filter(ee.Filter.lt("CLOUD_COVER", 50))
                   .median())

        thermal = landsat.select("B10")
        red = landsat.select("B4")
        nir = landsat.select("B5")

        # Compute NDVI
        ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI")

        # Compute Emissivity
        emissivity = ndvi.expression("0.004 * NDVI + 0.986", {
            "NDVI": ndvi
        }).rename("Emissivity")

        # Compute Brightness Temperature
        K1 = 774.8853
        K2 = 1321.0789
        bt = thermal.expression("K2 / log((K1 / TIR) + 1)", {
            "TIR": thermal,
            "K1": K1,
            "K2": K2
        }).rename("Brightness_Temp")

        # Compute Land Surface Temperature (LST)
        lst = bt.expression(
            "BT / (1 + (10.895 * BT / 14380) * log(E))", {
                "BT": bt,
                "E": emissivity
            }).rename("LST")

        # Optionally scale with zoom: higher zoom = more detail (smaller scale)
        scale = 10 if int(zoom) >= 14 else 30

        # Compute LST min/max for visualization
        lst_stats = lst.reduceRegion(
            reducer=ee.Reducer.minMax(),
            geometry=polygon,
            scale=scale,
            maxPixels=1e13,
            bestEffort=True
        )

        lst_min = lst_stats.get('LST_min').getInfo()
        lst_max = lst_stats.get('LST_max').getInfo()

        if lst_min is None or lst_max is None:
            print("No data available for LST computation.")
            return None

        # Create a geemap Map
        mm = geemap.Map(toolbar_ctrl=False, search_control=False, draw_control=False, measure_control=False, fullscreen_control=True)
        
        mm.add_basemap("HYBRID")

        # Add Sentinel-2 RGB
        mm.addLayer(sentinel, {
            'bands': ['B4', 'B3', 'B2'],
            'min': 0, 'max': 3000, 'gamma': 1.2
        }, "Sentinel-2")

        # Add NDVI
        mm.addLayer(ndvi, {
            'min': -1,
            'max': 1,
            'palette': ['blue', 'white', 'green']
        }, "NDVI")

        # Add Emissivity (LSE)
        mm.addLayer(emissivity, {
            'min': 0.98,
            'max': 1,
            'palette': ['blue', 'white', 'red']
        }, "Emissivity (LSE)")

        # Add LST
        mm.addLayer(lst, {
            'min': lst_min - 5,
            'max': lst_max + 5,
            'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
        }, "Land Surface Temperature (LST)")

        # Center the map on the polygon
        mm.centerObject(polygon, zoom)
        
        mm.layer_to_image("Sentinel-2", output="./uploads/input_image.png", region=polygon, scale=scale)
        mm.layer_to_image("NDVI", output="./uhi_map/ndvi.png", region=polygon, scale=scale)
        mm.layer_to_image("Emissivity (LSE)", output="./uhi_map/lse.png", region=polygon, scale=scale)
        mm.layer_to_image("Land Surface Temperature (LST)", output="./uhi_map/lst.png", region=polygon, scale=scale)

        # # Save the map to an HTML file
        # output_file = "./uhi_map/map.html"
        # mm.to_html(filename=output_file, width='100%', add_layer_control=True) 
        
        # Return URLs of the images
        return {
            # "map_url": "/uhi_map/map.html",
            "sentinel_image_url": "/uploads/input_image.png",
            "ndvi_image_url": "/uhi_map/ndvi.png",
            "lse_image_url": "/uhi_map/lse.png",
            "lst_image_url": "/uhi_map/lst.png"
        }

    except Exception as e:
        print(f"Error fetching maps: {e}")
        return None