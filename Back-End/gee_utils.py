import ee
import google.auth
from google.oauth2 import service_account
# Initialize Earth Engine


# Replace with your service account email and the path to your key file
service_account_email = 'satxtract-service@satxtract.iam.gserviceaccount.com'
key_file = '/mnt/d/DevFx Hub/Programming/Projects/SatXtract-website/Back-End/satxtract-412cba70a931.json'

# # Define the required scopes
# scopes = ['https://www.googleapis.com/auth/earthengine']

# Create credentials using the service account and scopes
credentials = service_account.Credentials.from_service_account_file(
    '/mnt/d/DevFx Hub/Programming/Projects/SatXtract-website/Back-End/satxtract-412cba70a931.json',
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

def fetch_map_uhi(polygon_coords, zoom, start_date, end_date):
    """Fetch Normal, LSE, LST, and NDVI maps for a given polygon and zoom level."""
    try:
        start_date_ee = ee.Date(start_date)
        end_date_ee = ee.Date(end_date)
        polygon = ee.Geometry.Polygon(polygon_coords)

        # Sentinel-2 surface reflectance
        sentinel = (ee.ImageCollection("COPERNICUS/S2_SR")
                    .filterBounds(polygon)
                    .filterDate(start_date_ee, end_date_ee)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                    .median())

        normal_map_url = get_map_url(sentinel, {
            'bands': ['B4', 'B3', 'B2'],
            'min': 0, 'max': 3000, 'gamma': 1.2
        })

        # LANDSAT for thermal + LST
        landsat = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
                   .filterBounds(polygon)
                   .filterDate(start_date_ee, end_date_ee)
                   .filter(ee.Filter.lt("CLOUD_COVER", 50))
                   .median())

        thermal = landsat.select("B10")
        red = landsat.select("B4")
        nir = landsat.select("B5")

        ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI")

        emissivity = ndvi.expression("0.004 * NDVI + 0.986", {
            "NDVI": ndvi
        }).rename("Emissivity")

        K1 = 774.8853
        K2 = 1321.0789

        bt = thermal.expression("K2 / log((K1 / TIR) + 1)", {
            "TIR": thermal,
            "K1": K1,
            "K2": K2
        }).rename("Brightness_Temp")

        lst = bt.expression(
            "BT / (1 + (10.895 * BT / 14380) * log(E))", {
                "BT": bt,
                "E": emissivity
            }).rename("LST")

        # Optionally scale with zoom: higher zoom = more detail (smaller scale)
        scale = 10 if zoom >= 14 else 30

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

        lst_map_url = get_map_url(lst, {
            'min': lst_min - 5,
            'max': lst_max + 5,
            'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
        })

        ndvi_map_url = get_map_url(ndvi, {
            'min': -1,
            'max': 1,
            'palette': ['blue', 'white', 'green']
        })

        lse_map_url = get_map_url(emissivity, {
            'min': 0.98,
            'max': 1,
            'palette': ['blue', 'white', 'red']
        })

        return {
            "normal_map": normal_map_url,
            "lse_map": lse_map_url,
            "lst_map": lst_map_url,
            "ndvi_map": ndvi_map_url,
        }

    except Exception as e:
        print(f"Error fetching maps: {e}")
        return None