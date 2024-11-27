import pickle

with open("soil_health_model_v2.pkl", "rb") as f:
    model = pickle.load(f)

# Check if the model is fitted
try:
    print(model.n_estimators_)  # This will raise an AttributeError if not fitted
except AttributeError as e:
    print("Model is not fitted:", str(e))
