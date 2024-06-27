export function convertToUTC(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);

  const now = new Date();
  const destinationTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );

  return destinationTime.toISOString();
}
