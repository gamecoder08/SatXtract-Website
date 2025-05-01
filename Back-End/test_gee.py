from gee_utils2 import fetch_map_with_geemap
# import google.auth
# import ee

# credentials, _ = google.auth.default()
# try:
#     ee.Initialize(credentials,project='satxtract')
# except Exception as e:
#     ee.Initialize(credentials,project='satxtract')

# Sample coordinates and dates for testing
latitude = 12.8202   # SRM
longitude = 80.0438 
zoom = 14
mapCorners=[[91.5915647008535, 26.111487645087607], [91.5915647008535, 26.088327584389575], [91.63571701205763, 26.088327584389575], [91.63571701205763, 26.111487645087607]]
start_date = "2023-01-01"
end_date = "2023-01-31"

# Call the function
# result = fetch_map_uhi_v2(mapCorners, zoom, start_date, end_date)
result = fetch_map_with_geemap(mapCorners, zoom, start_date, end_date)

# result = fetch_map_uhi_v2(polygon_coords,zoom , start_date, end_date)

# Print the URLs returned
print("GEE Map URLs:")
print(result)
