#
# Model: https://huggingface.co/amazon/chronos-t5-mini
#

from math import floor
# import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import torch
from chronos import ChronosPipeline

#
# settings
#
file_path = 'data/MTA_Daily_Ridership_Data__Beginning_2020.csv'
model = "amazon/chronos-t5-mini"

def build_df():
  #
  # cleanup and build dataframe
  #
  # Load the CSV file
  print("reading " + file_path)
  df = pd.read_csv(file_path).iloc[::-1]
  print("building features")

  # Handle missing values by dropping rows with any missing data
  # df = df.dropna()

  # Encode the Date column as datetime
  df['Date'] = pd.to_datetime(df['Date'])

  # Select features
  return df['Buses: Total Estimated Ridership']
  
def chronos_forecast(target, days_into_future):
  #
  # zero-shot chronos run on dataframe
  #  for time-series prediction
  #
  print("running chronos pipeline on " + model)
  pipeline = ChronosPipeline.from_pretrained(
    model,
    device_map="cpu",
    torch_dtype=torch.bfloat16,
  )

  context = torch.tensor(target)
  forecast = pipeline.predict(context, days_into_future, limit_prediction_length=False)
  median = np.quantile(forecast[0].numpy(), [0.5], axis=0)
  
  # start viz
  # forecast_index = range(len(target), len(target) + days_into_future)
  # low, median, high = np.quantile(forecast[0].numpy(), [0.1, 0.5, 0.9], axis=0)

  # plt.figure(figsize=(8, 4))
  # plt.plot(target, color="royalblue", label="historical data")
  # plt.plot(forecast_index, median, color="tomato", label="median forecast")
  # plt.fill_between(forecast_index, low, high, color="tomato", alpha=0.3, label="80% prediction interval")
  # plt.legend()
  # plt.grid()
  # plt.show()
  # end viz
  
  return median[-1][-1]

def predict(days_into_future) -> float:
  if days_into_future <= 0:
    return 0
  return floor(chronos_forecast(build_df(), days_into_future))


predict(10)
