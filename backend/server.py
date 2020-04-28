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
    isolation = str(request.form.get('isolation', 0))
    isolationEnd = str(request.form.get('isolationEnd', 0))
    isolationCompliance = str(request.form.get('isolationCompliance', 0))
    physDist = str(request.form.get('physDist', 0))
    physDistStart = str(request.form.get('physDistStart', 0))
    physDistAfterActRate = str(request.form.get('physDistAfterActRate', 0))
    physDistLength = str(request.form.get('physDistLength', 0))
    lockdown = str(request.form.get('lockdown', 0))
    lockdownStart = str(request.form.get('lockdownStart', 0))
    lockdownAfterActRate = str(request.form.get('lockdownAfterActRate', 0))
    contactTracing = str(request.form.get('contactTracing', 0))
    contactTracingStart = str(request.form.get('contactTracingStart', 0))
    contactTracingAggressiveness = str(request.form.get('contactTracingAggressiveness', 0))

    # Example script run
    # result = subprocess.run(['cat', 'sample.csv'], stdout=subprocess.PIPE).stdout.decode('utf-8')
    result = subprocess.run(['Rscript', 'simulate.R', isolation, isolationEnd, isolationCompliance, physDist, physDistStart, physDistAfterActRate, 
        physDistLength, lockdown, lockdownStart, lockdownAfterActRate, contactTracing, contactTracingStart, contactTracingAggressiveness], stdout=subprocess.PIPE).stdout.decode('utf-8') 
    
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