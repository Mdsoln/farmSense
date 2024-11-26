from flask import Flask, request, jsonify
import pickle
import pandas as pd

# Load the model
try:
    with open("soil_health_model_v2.pkl", "rb") as f:
        model = pickle.load(f)
except FileNotFoundError:
    raise RuntimeError("Model file 'soil_health_model_v2.pkl' not found. Train and save the model first.")

# Create Flask app
app = Flask(__name__)

# Define feature list
FEATURES = [
    "Saturation (% weight)", "Organic Carbon (% weight)", "Soil pH",
    "Nitrogen Level", "Phosphorus Level", "Potassium Level",
    "Salinity (dS/m)", "Oxygen Level (%)"
]

# Recommendation system
def generate_recommendations(input_features):
    recommendations = {}

    if input_features["Saturation (% weight)"] < 20:
        recommendations["Saturation (% weight)"] = "Increase irrigation to improve saturation."
    elif input_features["Saturation (% weight)"] > 40:
        recommendations["Saturation (% weight)"] = "Install drainage systems to reduce excess water."
    else:
        recommendations["Saturation (% weight)"] = "Saturation levels are optimal. Maintain current practices."

    if input_features["Organic Carbon (% weight)"] < 2:
        recommendations["Organic Carbon (% weight)"] = "Incorporate organic matter like compost."
    else:
        recommendations["Organic Carbon (% weight)"] = "Organic Carbon levels are good. Maintain regular soil testing."

    if input_features["Soil pH"] < 6:
        recommendations["Soil pH"] = "Apply lime to raise pH levels."
    elif input_features["Soil pH"] > 7.5:
        recommendations["Soil pH"] = "Use sulfur-based amendments to lower pH."
    else:
        recommendations["Soil pH"] = "Soil pH is within the optimal range."

    if input_features["Nitrogen Level"] < 20:
        recommendations["Nitrogen Level"] = "Add nitrogen fertilizers to improve levels."
    else:
        recommendations["Nitrogen Level"] = "Nitrogen levels are adequate. Monitor periodically."

    if input_features["Phosphorus Level"] < 15:
        recommendations["Phosphorus Level"] = "Incorporate phosphorus fertilizers like superphosphate."
    else:
        recommendations["Phosphorus Level"] = "Phosphorus levels are sufficient. No immediate action needed."

    if input_features["Potassium Level"] < 10:
        recommendations["Potassium Level"] = "Apply potash-based fertilizers to boost levels."
    else:
        recommendations["Potassium Level"] = "Potassium levels are optimal. Maintain good practices."

    if input_features["Salinity (dS/m)"] > 1:
        recommendations["Salinity (dS/m)"] = "Leach salts or plant salt-tolerant crops."
    else:
        recommendations["Salinity (dS/m)"] = "Salinity is under control. Continue monitoring."

    if input_features["Oxygen Level (%)"] < 15:
        recommendations["Oxygen Level (%)"] = "Aerate the soil to improve oxygen levels."
    else:
        recommendations["Oxygen Level (%)"] = "Oxygen levels are adequate."

    return recommendations

# Prediction and recommendation endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        input_data = request.json
        input_df = pd.DataFrame([input_data])
        input_df = input_df[FEATURES]  # Ensure correct feature order

        # Make prediction
        prediction = model.predict(input_df)[0]
        prediction_label = {0: "Poor", 1: "Moderate", 2: "Healthy"}[prediction]

        # Generate recommendations
        recommendations = generate_recommendations(input_data)

        # Respond with prediction and recommendations
        return jsonify({
            "Soil Health Prediction": prediction_label,
            "Recommendations": recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)})

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
