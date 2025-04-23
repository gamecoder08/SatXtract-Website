from gee_utils2 import fetch_map_uhi_v2
from gee_utils2 import fetch_map_with_geemap
# import google.auth
# import ee

# credentials, _ = google.auth.default()
# try:
#     ee.Initialize(credentials,project='satxtract')
# except Exception as e:
#     ee.Initialize(credentials,project='satxtract')

# Sample coordinates and dates for testing
latitude = 28.6139   # New Delhi
longitude = 77.2090
zoom = 12
mapCorners=[[79.117499322235, 13.114477924101521], [79.117499322235, 12.347140592974768], [80.47374137862522, 12.347140592974768], [80.47374137862522, 13.114477924101521]]
start_date = "2023-01-01"
end_date = "2023-01-31"

# Call the function
# result = fetch_map_uhi_v2(mapCorners, zoom, start_date, end_date)
result = fetch_map_with_geemap(mapCorners, zoom, start_date, end_date)

# result = fetch_map_uhi_v2(polygon_coords,zoom , start_date, end_date)

# Print the URLs returned
print("GEE Map URLs:")
print(result)
