import pickle
from sklearn.ensemble import RandomForestClassifier  # Or whatever model you're using

# Assuming `model` is your trained model
model = RandomForestClassifier()
# Train the model...
with open("soil_health_model_v2.pkl", "wb") as f:
    pickle.dump(model, f)
