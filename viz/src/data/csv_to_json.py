import re
import csv
import json

dct = {}
reader = open("forVisualization.csv", "r")
csv_reader = csv.DictReader(reader)
# csv_reader = csv.reader(reader, quotechar='\'', delimiter=',', quoting=csv.QUOTE_ALL, skipinitialspace=True)
for row in csv_reader:
    for key in row:
        try:
            row[key] = int(row[key])
        except:
            row[key] = 0
    dct[int(row['time'])] = row
reader.close()

writer = open("data.json", "w")
writer.write(json.dumps(dct))
writer.close()
