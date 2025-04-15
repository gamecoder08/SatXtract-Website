import ee
import google.auth
# Initialize Earth Engine

credentials, _ = google.auth.default()
try:
    ee.Initialize(credentials,project='satxtract')
except Exception as e:
    ee.Initialize(credentials,project='satxtract')

def get_thumb_url(image, vis_params, region):
    """Generate a static thumbnail URL from an EE image."""
    params = {
        'region': region,
        'dimensions': 1024,
        'format': 'png'
    }
    params.update(vis_params)
    return image.getThumbURL(params)

def fetch_map_uhi(latitude, longitude, zoom, start_date, end_date):
    """Fetch Normal, LSE, LST, and NDVI thumbnail image URLs."""

    point = ee.Geometry.Point(longitude, latitude)
    buffer_radius_meters = 10000  # 10km buffer
    region = point.buffer(buffer_radius_meters).bounds()

    start_date_ee = ee.Date(start_date)
    end_date_ee = ee.Date(end_date)

    # Normal Map (Sentinel-2 RGB)
    sentinel = (ee.ImageCollection("COPERNICUS/S2")
                .filterBounds(point)
                .filterDate(start_date_ee, end_date_ee)
                .median())

    normal_url = get_thumb_url(sentinel, {
        'bands': ['B4', 'B3', 'B2'],
        'min': 0,
        'max': 3000
    }, region)

    # LSE Map (MODIS)
    lse = (ee.ImageCollection("MODIS/006/MOD11A2")
           .filterBounds(point)
           .filterDate(start_date_ee, end_date_ee)
           .median())

    lse_url = get_thumb_url(lse, {
        'bands': ['LST_Day_1km'],
        'min': 13000,
        'max': 16500,
        'palette': ['blue', 'green', 'red']
    }, region)

    # LST Map (MODIS)
    lst = (ee.ImageCollection("MODIS/006/MOD11A2")
           .filterBounds(point)
           .filterDate(start_date_ee, end_date_ee)
           .select('LST_Day_1km')
           .median())

    lst_url = get_thumb_url(lst, {
        'min': 13000,
        'max': 16500,
        'palette': ['blue', 'yellow', 'red']
    }, region)

    # NDVI Map (Sentinel-2)
    ndvi = sentinel.normalizedDifference(['B8', 'B4'])

    ndvi_url = get_thumb_url(ndvi, {
        'min': -1,
        'max': 1,
        'palette': ['blue', 'white', 'green']
    }, region)

    return {
        "normal_map": normal_url,
        "lse_map": lse_url,
        "lst_map": lst_url,
        "ndvi_map": ndvi_url
    }
