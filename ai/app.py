from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend

# Load Trained Model
model = joblib.load("safety_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Extract features from request
        features = [
            data["latitude"], data["longitude"], 
            data["light_intensity"], data["traffic_density"], 
            data["crowd_density"], data["crime_rate"], 
            data["accident_rate"], data["crime_against_women"]
        ]

        # Convert to DataFrame
        input_df = pd.DataFrame([features], columns=[
            "Latitude", "Longitude", "Light Intensity", "Traffic Density", 
            "Crowd Density", "Crime Rate", "Accident Rate", "Crime against women"
        ])

        # Predict safety score
        prediction = model.predict(input_df)[0]
        
        # Return JSON response
        return jsonify({"safety_score": round(float(prediction), 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
