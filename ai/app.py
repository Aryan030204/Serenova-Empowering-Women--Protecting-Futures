from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load ML model
with open("./model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    lat1, lon1 = data['lat1'], data['lon1']
    lat2, lon2 = data['lat2'], data['lon2']

    # Predict safety score
    input_data = np.array([[lat1, lon1], [lat2, lon2]])
    predictions = model.predict(input_data)
    avg_safety_score = np.mean(predictions)

    return jsonify({"safety_score": avg_safety_score})

if __name__ == '__main__':
    app.run(debug=True)
