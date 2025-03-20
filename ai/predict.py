import pickle
import numpy as np

# Load trained model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

def predict_safety_score(lat1, lon1, lat2, lon2):
    """Predicts safety score based on lat/lon"""
    # Create feature array
    input_data = np.array([[lat1, lon1], [lat2, lon2]])

    # Predict scores
    predictions = model.predict(input_data)

    # Calculate average safety score
    avg_safety_score = np.mean(predictions)

    return avg_safety_score

if __name__ == "__main__":
    # Test Prediction
    lat1, lon1 = 28.7041, 77.1025  # Example: Delhi
    lat2, lon2 = 19.0760, 72.8777  # Example: Mumbai

    safety_score = predict_safety_score(lat1, lon1, lat2, lon2)
    print(f"Predicted Safety Score: {safety_score:.2f}")
