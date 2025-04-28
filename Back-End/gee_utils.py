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
    print(map_id)

    return f"https://earthengine.googleapis.com/map/{map_id['mapid']}/{{z}}/{{x}}/{{y}}"

# def fetch_map_uhi(polygon_coords, zoom, start_date, end_date):
#     """Fetch Normal, LSE, LST, and NDVI maps for a given polygon and zoom level."""
#     try:
#         start_date_ee = ee.Date(start_date)
#         end_date_ee = ee.Date(end_date)
#         polygon = ee.Geometry.Polygon(polygon_coords)

#         # Sentinel-2 surface reflectance
#         sentinel = (ee.ImageCollection("COPERNICUS/S2_SR")
#                     .filterBounds(polygon)
#                     .filterDate(start_date_ee, end_date_ee)
#                     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
#                     .median())

#         normal_map_url = get_map_url(sentinel, {
#             'bands': ['B4', 'B3', 'B2'],
#             'min': 0, 'max': 3000, 'gamma': 1.2
#         })

#         # LANDSAT for thermal + LST
#         landsat = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
#                    .filterBounds(polygon)
#                    .filterDate(start_date_ee, end_date_ee)
#                    .filter(ee.Filter.lt("CLOUD_COVER", 50))
#                    .median())

#         thermal = landsat.select("B10")
#         red = landsat.select("B4")
#         nir = landsat.select("B5")

#         ndvi = nir.subtract(red).divide(nir.add(red)).rename("NDVI")

#         emissivity = ndvi.expression("0.004 * NDVI + 0.986", {
#             "NDVI": ndvi
#         }).rename("Emissivity")

#         K1 = 774.8853
#         K2 = 1321.0789

#         bt = thermal.expression("K2 / log((K1 / TIR) + 1)", {
#             "TIR": thermal,
#             "K1": K1,
#             "K2": K2
#         }).rename("Brightness_Temp")

#         lst = bt.expression(
#             "BT / (1 + (10.895 * BT / 14380) * log(E))", {
#                 "BT": bt,
#                 "E": emissivity
#             }).rename("LST")

#         # Optionally scale with zoom: higher zoom = more detail (smaller scale)
#         scale = 10 if zoom >= 14 else 30

#         lst_stats = lst.reduceRegion(
#             reducer=ee.Reducer.minMax(),
#             geometry=polygon,
#             scale=scale,
#             maxPixels=1e13,
#             bestEffort=True
#         )

#         lst_min = lst_stats.get('LST_min').getInfo()
#         lst_max = lst_stats.get('LST_max').getInfo()

#         if lst_min is None or lst_max is None:
#             print("No data available for LST computation.")
#             return None

#         lst_map_url = get_map_url(lst, {
#             'min': lst_min - 5,
#             'max': lst_max + 5,
#             'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
#         })

#         ndvi_map_url = get_map_url(ndvi, {
#             'min': -1,
#             'max': 1,
#             'palette': ['blue', 'white', 'green']
#         })

#         lse_map_url = get_map_url(emissivity, {
#             'min': 0.98,
#             'max': 1,
#             'palette': ['blue', 'white', 'red']
#         })

#         return {
#             "normal_map": normal_map_url,
#             "lse_map": lse_map_url,
#             "lst_map": lst_map_url,
#             "ndvi_map": ndvi_map_url,
#         }

#     except Exception as e:
#         print(f"Error fetching maps: {e}")
#         return None
    
    
    


# # For polygon shape selection
# def fetch_map_uhi_v2(polygon, zoom, start_date, end_date):
#     """Fetch Normal, LSE, LST, and NDVI maps."""
#     try:
#         start_date_ee = ee.Date(start_date)
#         end_date_ee = ee.Date(end_date)
#         polygon = ee.Geometry.Polygon(polygon_coords)
    
#         # Sentinel-2 SR image collection for best surface reflectance
#         sentinel = (ee.ImageCollection("COPERNICUS/S2_SR")
                    
#                     '''
#                     .filterBounds(ee.Geometry.Polygon(
#                         [
#                             [
#                                 [138.5206051676438, 36.425420321930716],
#                                 [138.5206051676438, 36.30034394260757],
#                                 [138.7465881498856, 36.30034394260757],
#                                 [138.7465881498856, 36.425420321930716],
#                                 [138.5206051676438, 36.425420321930716]
#                             ]
#                         ]
#                         ))
#                     '''
#                     .filterBounds(polygon) # Filter by polygon
#                     .filterDate(start_date_ee, end_date_ee)
#                     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) # Filter out cloudy images less than 10%
#                     .median()
#                     )
        
#         # from sentinel-satellite image
#         normal_map_url = get_map_url(sentinel, {
#             'bands': ['B4', 'B3', 'B2'], 
#             'min': 0, 'max': 3000, 'gamma': 1.2
#             }
#         )
    
    


#         # Custom code for LST from LANDSAT satellite
#         landsat = (ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
#                 '''
#                 .filterBounds(ee.Geometry.Polygon(
#                         [
#                             [
#                                 [138.5206051676438, 36.425420321930716],
#                                 [138.5206051676438, 36.30034394260757],
#                                 [138.7465881498856, 36.30034394260757],
#                                 [138.7465881498856, 36.425420321930716],
#                                 [138.5206051676438, 36.425420321930716]
#                             ]
#                         ]
#                         ))
#                 '''
#                 .filterBounds(polygon) # Filter by polygon
#                 .filterDate(start_date_ee, end_date_ee)
#                 .filter(ee.Filter.lt("CLOUD_COVER", 50)) # Avoid very cloudy images
#                 .median()
#             ) 
        
        
#         thermal_band_landsat = landsat.select("B10") # Select the thermal band
#         red_band = landsat.select("B4") # Select the red band
#         near_infrared_band = landsat.select("B5") # Select the near-infrared band
        
#         # ndvi calculation
#         ndvi = near_infrared_band.subtract(red_band).divide(near_infrared_band.add(red_band)).rename("NDVI")
        
#         K1 = 774.8853
#         K2 = 1321.0789
        
        
#         # LSE calculation [Custom Expression]
#         emissivity = ndvi.expression(
#             "0.004 * NDVI + 0.986",
#                 { "NDVI": ndvi }
#         ).rename("Emissivity")
        
        
#         # Computing Brightness
#         bt = thermal_band_landsat.expression(
#             "K2 / log((K1 / TIR) + 1)",
#                 {
#                     "TIR": thermal_band_landsat,
#                     "K1": K1,
#                     "K2": K2
#                 }
#         ).rename("Brightness_Temp")
        
        
#         # Computing LST dynamically from map
#         lst = bt.expression(
#         "BT / (1 + (10.895 * BT / 14380) * log(E))",
#             {
#                 "BT": bt,
#                 "E": emissivity
#             }
#         ).rename("LST")

        
#         # Optionally scale with zoom: higher zoom = more detail (smaller scale)
#         scale = 10 if zoom >= 14 else 30
        
#         lstStats = lst.reduceRegion(
#             {
#             reducer: ee.Reducer.minMax(),
#             geometry: polygon,
#             scale: scale,
#             maxPixels: 1e13,
#             bestEffort: true
#             }
#         )
        
#         lst_min = lst_stats.get('LST_min').getInfo()
#         lst_max = lst_stats.get('LST_max').getInfo()

#         if lst_min is None or lst_max is None:
#             print("No data available for LST computation.")
#             return None

#         else:
            
#             # Define Visualization Parameters for LST
#             lst_vis_params = {
#                 'min': lst_min - 5,
#                 'max': lst_max + 5,
#                 'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
#             }
            
#             lst_map_url = get_map_url(lst, lst_vis_params)


#             # NDVI Visualization Parameters
#             ndvi_vis_params = {
#                 'min': -1,
#                 'max': 1,
#                 'palette': ['blue', 'white', 'green']
#             }
            
#             ndvi_map_url = get_map_url(ndvi, ndvi_vis_params)


#             # Emissivity Visualization Parameters
#             emissivity_vis_params = {
#                 'min': 0.98,
#                 'max': 1,
#                 'palette': ['blue', 'white', 'red']
#             }
            
#             lse_map_url = get_map_url(emissivity, emissivity_vis_params)

#         return {
#             "normal_map": normal_map_url,
#             "lse_map": lse_map_url,
#             "lst_map": lst_map_url,
#             "ndvi_map": ndvi_map_url
#         }


#     except Exception as e:
#         print(f"Error fetching maps: {e}")
#         return None
    
def fetch_map_with_geemap(polygon_coords, zoom, start_date, end_date):
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
        mm = geemap.Map()

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

        # Save the map to an HTML file
        output_file = "./uhi_map/map.html"
        mm.save(output_file)
        return "map.html"

    except Exception as e:
        print(f"Error fetching maps: {e}")
        return None