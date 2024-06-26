export function convertToUTC(timeString: string) {
  const [time, period] = timeString.split(' ');

  let [hours, minutes] = time.split(':').map(Number);

  if (period.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  const now = new Date();
  const dateWithTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );

  const utcString = dateWithTime.toISOString();

  return utcString;
}
