import json

# Open the large JSON file for reading
with open('allCountries.json', 'r') as f:
    # Load the JSON data
    data = json.load(f)

# Open a new file for writing the minified JSON
with open('minified_file.json', 'w') as f:
    # Dump the JSON data to the new file using the separators parameter
    json.dump(data, f, separators=(',', ':'))