import ee
import geemap
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
    map_url = f"https://earthengine.googleapis.com/map/{map_id['mapid']}/{{z}}/{{x}}/{{y}}?token={map_id['token']}"
    print(map_id)

    return map_url

def fetch_map_uhi_v2(polygon_coords, zoom, start_date, end_date):
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
    
def fetch_map_with_geemap(polygon_coords, start_date, end_date, zoom):
    """Fetch Normal, LSE, LST, and NDVI maps using geemap."""
    try:
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
        scale = 10 if zoom >= 14 else 30

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
        m = geemap.Map()

        # Add Sentinel-2 RGB
        m.addLayer(sentinel, {
            'bands': ['B4', 'B3', 'B2'],
            'min': 0, 'max': 3000, 'gamma': 1.2
        }, "Sentinel-2")

        # Add NDVI
        m.addLayer(ndvi, {
            'min': -1,
            'max': 1,
            'palette': ['blue', 'white', 'green']
        }, "NDVI")

        # Add Emissivity (LSE)
        m.addLayer(emissivity, {
            'min': 0.98,
            'max': 1,
            'palette': ['blue', 'white', 'red']
        }, "Emissivity (LSE)")

        # Add LST
        m.addLayer(lst, {
            'min': lst_min - 5,
            'max': lst_max + 5,
            'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
        }, "Land Surface Temperature (LST)")

        # Center the map on the polygon
        m.centerObject(polygon, zoom)

        # Save the map to an HTML file
        output_file = "map.html"
        m.save(output_file)
        print(f"Map has been saved to {output_file}. Open it in a browser to view.")

    except Exception as e:
        print(f"Error fetching maps: {e}")
        return None

    
# Example Usage
polygon_coords = [[79.117499322235, 13.114477924101521], [79.117499322235, 12.347140592974768], [80.47374137862522, 12.347140592974768], [80.47374137862522, 13.114477924101521]]

start_date = "2023-01-01"
end_date = "2023-12-31"
zoom = 12

fetch_map_with_geemap(polygon_coords, start_date, end_date, zoom)