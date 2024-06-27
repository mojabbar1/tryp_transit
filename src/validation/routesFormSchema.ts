import z from 'zod';

const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i;

export const routesFormSchema = z.object({
  departure: z.string().min(1, 'Must choose a valid destination.'),
  destination: z.string().min(1, 'Must choose a valid destination.'),
  timeToDestination: z.string().min(1, 'Must be a valid time'),
});
