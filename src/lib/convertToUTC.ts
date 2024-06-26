import { parse } from 'date-fns';

export function convertToUTC(time: string): string {
  const parsedTime = parse(time, 'h:mm a', new Date());

  const now = new Date();
  const destinationTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parsedTime.getHours(),
    parsedTime.getMinutes(),
  );

  return destinationTime.toISOString();
}
