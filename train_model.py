from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import pickle

# Define features
FEATURES = [
    "Saturation (% weight)", "Organic Carbon (% weight)", "Soil pH",
    "Nitrogen Level", "Phosphorus Level", "Potassium Level",
    "Salinity (dS/m)", "Oxygen Level (%)"
]


# Create synthetic data for demonstration
import numpy as np
np.random.seed(42)
X = pd.DataFrame(
    np.random.rand(1000, len(FEATURES)) * 100,  # Random data
    columns=FEATURES
)
y = np.random.randint(0, 3, size=1000)  # Random target labels (0, 1, 2)

# Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Save the fitted model
with open("soil_health_model_v2.pkl", "wb") as f:
    pickle.dump(model, f)
