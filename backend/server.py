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
    isolation = int(request.json.get('isolation', 0))
    isolationEnd = int(request.json.get('isolationEnd', 0))
    isolationCompliance = int(request.json.get('isolationCompliance', 0))
    physDist = int(request.json.get('physDist', 0))
    physDistStart = int(request.json.get('physDistStart', 0))
    physDistAfterActRate = int(request.json.get('physDistAfterActRate', 0))
    lockdown = int(request.json.get('lockdown', 0))
    lockdownStart = int(request.json.get('lockdownStart', 0))
    lockdownAfterActRate = int(request.json.get('lockdownAfterActRate', 0))
    lockdownLength = int(request.json.get('lockdownLength', 0))
    contactTracing = int(request.json.get('contactTracing', 0))
    contactTracingStart = int(request.json.get('contactTracingStart', 0))
    contactTracingAggressiveness = int(request.json.get('contactTracingAggressiveness', 0))

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
    app.run(host='0.0.0.0', port='80', debug=False)