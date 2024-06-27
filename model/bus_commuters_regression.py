import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# number of days to predict into the future
days_into_future = 5

# Load the CSV file
file_path = 'MTA_Daily_Ridership_Data__Beginning_2020.csv'
df = pd.read_csv(file_path)

# Handle missing values by dropping rows with any missing data
df_cleaned = df.dropna()

# Encode the Date column as datetime
df_cleaned['Date'] = pd.to_datetime(df_cleaned['Date'])

# Select features
features = df_cleaned[['Subways: % of Comparable Pre-Pandemic Day',
                       'Buses: % of Comparable Pre-Pandemic Day',
                       'LIRR: % of Comparable Pre-Pandemic Day',
                       'Metro-North: % of Comparable Pre-Pandemic Day',
                       'Access-A-Ride: % of Comparable Pre-Pandemic Day',
                       'Bridges and Tunnels: % of Comparable Pre-Pandemic Day',
                       'Staten Island Railway: % of Comparable Pre-Pandemic Day']]
target_bus = df_cleaned['Buses: Total Estimated Ridership']

# Split the data into training and testing sets for bus ridership
X_train_bus, X_test_bus, y_train_bus, y_test_bus = train_test_split(features, target_bus, test_size=0.2, random_state=42)

# Build and train the model for bus ridership
model_bus = LinearRegression()
model_bus.fit(X_train_bus, y_train_bus)

# Extract the latest available feature data
# latest_features = df_cleaned[['Subways: % of Comparable Pre-Pandemic Day',
#                               'Buses: % of Comparable Pre-Pandemic Day',
#                               'LIRR: % of Comparable Pre-Pandemic Day',
#                               'Metro-North: % of Comparable Pre-Pandemic Day',
#                               'Access-A-Ride: % of Comparable Pre-Pandemic Day',
#                               'Bridges and Tunnels: % of Comparable Pre-Pandemic Day',
#                               'Staten Island Railway: % of Comparable Pre-Pandemic Day']].iloc[-1]

# # Reshape for prediction
# latest_features_reshaped = latest_features.values.reshape(1, -1)

# compute daily changes
daily_changes = features.diff().mean()

# Create a DataFrame with future dates
future_dates = pd.date_range(start=df_cleaned['Date'].max() + pd.Timedelta(days=1), periods=days_into_future)

# Create a DataFrame with future feature values (you may need to fill these with estimates)
# Here, we'll use the last known values as a placeholder
last_known_values = features.iloc[-1]

future_features = pd.DataFrame([last_known_values] * days_into_future, index=future_dates)

for day in range(days_into_future):
    last_known_values += daily_changes
    future_features.iloc[day] = last_known_values

future_features = future_features.fillna(method='ffill')

# Reshape future features if necessary
future_features_reshaped = future_features.values

# Predict bus ridership for the future dates
predicted_bus_ridership_future = model_bus.predict(future_features_reshaped)

# Combine future dates with predictions
future_predictions = pd.DataFrame({
    'Date': future_dates,
    'Predicted Bus Ridership': predicted_bus_ridership_future
})

print(future_predictions)