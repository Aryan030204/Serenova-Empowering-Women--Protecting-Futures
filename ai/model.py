import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("./datasets/dataset.csv")

# Display dataset columns
print("Columns in dataset:", df.columns.tolist())

# Drop non-numeric columns
df = df.drop(columns=["City"])  # Drop 'City' because ML models need numerical data

# Encode categorical data if necessary
# label_encoder = LabelEncoder()
# df["City"] = label_encoder.fit_transform(df["City"])  # Convert city names into numbers

# Rename columns to ensure no accidental spaces
df.columns = df.columns.str.strip()

# Define Features (X) and Target (y)
X = df.drop(columns=["Safety score"])  # Features
y = df["Safety score"]  # Target variable

# Convert all feature columns to numeric
X = X.apply(pd.to_numeric, errors="coerce")  # Convert to float/int

# Check for NaN values and handle them
X.fillna(X.mean(), inplace=True)

# Split into training and testing datasets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForest Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "safety_model.pkl")
print("✅ Model trained and saved as 'safety_model.pkl'")
