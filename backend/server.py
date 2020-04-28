import flask
from flask import Flask, request, jsonify
import subprocess
import csv

app = Flask(__name__)

@app.route('/dataset', methods=['GET'])
def compute_dataset():
    # Extract fields
    isolation_multiplier = request.form.get('isolation_multiplier')
    contact_tracing_multiplier = request.form.get('contact_tracing_multiplier')
    physical_distancing_multiplier = request.form.get('physical_distancing_multiplier')
    hospital_capacity = request.form.get('hospital_capacity')
    lockdown_days = request.form.get('lockdown_days')
    lockdown_start = request.form.get('lockdown_start')
    mask_multiplier = request.form.get('mask_multiplier')

    # Example script run
    result = subprocess.run(['cmd', '/c', 'type', 'sample.csv'], stdout=subprocess.PIPE).stdout.decode('utf-8') # type = cat but for windows
    
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