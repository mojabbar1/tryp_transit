from flask import Flask
from bus_daily_chronos_t5_tiny import predict as predict_daily
from bus_hourly_chronos_t5_tiny import predict as predict_hourly

from datetime import datetime

app = Flask(__name__)

@app.route('/predict/time/<time>')
def predict_time(time):
    timestamp = datetime.strptime(time, '%H:%M')
    time_delta = datetime.now().replace(hour=timestamp.hour, minute=timestamp.minute) - datetime.now()
    hour_delta = time_delta.seconds//3600
    print(hour_delta)
    return str(predict_hourly(hour_delta))

@app.route('/predict/date/<date>')
def predict_date(date):
    date_delta = datetime.strptime(date, '%Y-%m-%d') - datetime.now()
    print(date_delta.days)
    return str(predict_daily(date_delta.days))
