# Passenger Count Forecasting

> Using [amazon/chronos-t5-mini](https://huggingface.co/amazon/chronos-t5-mini) time series forecasting model.  
> Training data from DATA.GOV

## Usage

1. Install Python
2. Make sure your current working directory is the `model/` directory
3. Create a virtual environment
   `python3 -m venv .venv`
4. Activate the virtual environment
   `./.venv/bin/activate`
5. Install dependencies
   `pip3 install -r requirements.txt`
6. Start the server
   `flask run`
   (By default the server runs on `localhost:5000`)

## API

### `/predict/date/<date>`

> Predicts total passengers that will be traveling via bus on `<date>`.

#### Parameters

- `<date>`
  - Formatted `YYYY-MM-DD`
  - Must be in the future.
  - If `<date>` is within 24 hours of current time, will return `0`.

#### Example

- Request: `GET http://localhost:5000/predict/date/2024-06-29`
- Response: `234128`

<hr>

### `/predict/time/<time>`

> Predicts total passengers that will be traveling via bus on `<time>` on today's date.

#### Parameters

- `<time>`
  - Formatted `HH:MM` as 24-hour time
  - Must be padded with leading zeros. For example, `6:35` should be `06:45`.
  - Must be in the future.
  - If `<date>` is within 1 hour of current time, will return `0`.

#### Example

- Request: `GET http://localhost:5000/predict/time/12:30`
- Response: `11`

## Training Data

> `data/` directory

- https://catalog.data.gov/dataset/mta-daily-ridership-data-beginning-2020
- https://catalog.data.gov/dataset/mta-bus-hourly-ridership-beginning-february-2022
