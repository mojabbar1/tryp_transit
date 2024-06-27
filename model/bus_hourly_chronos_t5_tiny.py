#
# Model: https://huggingface.co/amazon/chronos-t5-mini
#

from math import floor
# import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import torch
from chronos import ChronosPipeline

file_path = 'data/MTA_Bus_Hourly_Ridership__Beginning_February_2022_1000.csv'
model = "amazon/chronos-t5-mini"

def build_df():
  #
  # cleanup and build dataframe
  #
  # Load the CSV file
  print("reading " + file_path)
  df = pd.read_csv(file_path)

  print("building features")

  # Handle missing values by dropping rows with any missing data
  # df = df.dropna()

  # Encode the Date column as datetime
  df['transit_timestamp'] = pd.to_datetime(df['transit_timestamp'])

  # Select features
  return df['ridership']
  
def chronos_forecast(target, hours_into_future):
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
  forecast = pipeline.predict(context, hours_into_future, limit_prediction_length=False)
  median = np.quantile(forecast[0].numpy(), [0.5], axis=0)
  return median[-1][-1]

def predict(hours_into_future) -> float:
  if hours_into_future <= 0:
    return 0
  return floor(chronos_forecast(build_df(), hours_into_future))
