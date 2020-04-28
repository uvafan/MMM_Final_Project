import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import subprocess
import csv

app = Flask(__name__)
CORS(app)

@app.route('/dataset', methods=['POST'])
def compute_dataset():
    # Extract fields
    # TODO: Set defaults
    isolation = request.json.get('isolation', 0)
    isolationEnd = str(request.json.get('isolationEnd', 0))
    isolationCompliance = str(request.json.get('isolationCompliance', 0))
    physDist = str(request.json.get('physDist', 0))
    physDistStart = str(request.json.get('physDistStart', 0))
    physDistAfterActRate = str(request.json.get('physDistAfterActRate', 0))
    lockdown = str(request.json.get('lockdown', 0))
    lockdownStart = str(request.json.get('lockdownStart', 0))
    lockdownAfterActRate = str(request.json.get('lockdownAfterActRate', 0))
    lockdownLength = str(request.json.get('lockdownLength', 0))
    contactTracing = str(request.json.get('contactTracing', 0))
    contactTracingStart = str(request.json.get('contactTracingStart', 0))
    contactTracingAggressiveness = str(request.json.get('contactTracingAggressiveness', 0))

    # Run Script
    command = f'Rscript simulate.R {isolation} {isolationEnd} {isolationCompliance} {physDist} {physDistStart} {physDistAfterActRate} {lockdown} {lockdownStart} {lockdownAfterActRate} {lockdownLength} {contactTracing} {contactTracingStart} {contactTracingAggressiveness}'
    print(command)

    result = subprocess.run(command.split(" "), stdout=subprocess.PIPE).stdout.decode('utf-8') 
    
    # Convert to JSON
    dct = {}
    csv_file = result.splitlines()
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        for key in row:
            try:
                row[key] = int(float(row[key]))
            except:
                row[key] = 0
        if "" in row: del row[""]
        dct[int(row['time'])] = row
    return jsonify(dct)

if __name__ == "__main__":
    app.run(debug=True)