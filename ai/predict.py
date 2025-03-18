import pickle
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load trained model
model = pickle.load(open("safety_model.pkl", "rb"))

# Load dataset to fetch additional details
df = pd.read_csv("./datasets/dataset.csv")

def get_location_data(latitude, longitude):
    """Fetch data for a given location based on latitude & longitude."""
    location_data = df.loc[(df["Latitude"] == latitude) & (df["Longitude"] == longitude)]
    
    if not location_data.empty:
        return location_data.iloc[0].to_dict()  # Convert row to dictionary
    else:
        return None  # Location not found

@app.route('/predict', methods=['POST'])
def predict_safety():
    data = request.json
    lat1, lon1 = data.get("current_lat"), data.get("current_lon")
    lat2, lon2 = data.get("destination_lat"), data.get("destination_lon")

    # Fetch details for current and destination location
    current_data = get_location_data(lat1, lon1)
    destination_data = get_location_data(lat2, lon2)

    if current_data and destination_data:
        # Average both locations' feature values for prediction
        input_features = {
            "Light Intensity": (current_data["Light Intensity"] + destination_data["Light Intensity"]) / 2,
            "Traffic Density": (current_data["Traffic Density"] + destination_data["Traffic Density"]) / 2,
            "Crowd Density": (current_data["Crowd Density"] + destination_data["Crowd Density"]) / 2,
            "Crime Rate": (current_data["Crime Rate"] + destination_data["Crime Rate"]) / 2,
            "Accident Rate": (current_data["Accident Rate"] + destination_data["Accident Rate"]) / 2,
            "Crime against women": (current_data["Crime against women"] + destination_data["Crime against women"]) / 2,
        }

        input_df = pd.DataFrame([input_features])
        safety_score = model.predict(input_df)[0]
        return jsonify({"safety_score": safety_score})
    
    return jsonify({"error": "Location data not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
