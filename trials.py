import pickle
from sklearn.ensemble import RandomForestClassifier  # Example model

# Example model creation
model = RandomForestClassifier()
model.fit([[1, 2], [3, 4]], [0, 1])  # Example training

# Save the model
with open("soil_health_model_v2.pkl", "wb") as f:
    pickle.dump(model, f)
