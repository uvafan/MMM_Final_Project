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
    isolation = request.form.get('isolationMultiplier', 1)
    contact_tracing = request.form.get('contactTracingMultiplier', 1)
    physical_distancing = request.form.get('physicalDistancingMultiplier', 1)
    hospital_capacity = request.form.get('hospitalCapacity', 1)
    lockdown_days = request.form.get('lockdownDays', 1)
    lockdown_start = request.form.get('lockdownStart', 1)
    mask = request.form.get('maskMultiplier', 1)

    # Example script run
    result = subprocess.run(['cmd', '/c', 'type', 'sample.csv'], stdout=subprocess.PIPE).stdout.decode('utf-8') # type = cat but for windows
    # result = subprocess.run(['cmd', '/c', 'Rscript', 'simulate.R', 
    #                       isolation, contact_tracing, physical_distancing, hospital_capacity, lockdown_days, lockdown_start, mask], stdout=subprocess.PIPE).stdout.decode('utf-8') 
    
    # Convert to JSON
    dct = {}
    csv_file = result.splitlines()
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        for key in row:
            try:
                row[key] = int(row[key])
            except:
                row[key] = 0
        del row[""]
        dct[int(row['time'])] = row
    return jsonify(dct)

if __name__ == "__main__":
    app.run(debug=True)