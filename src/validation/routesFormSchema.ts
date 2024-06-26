import z from 'zod';

// regex calculated by ChatGPT
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM)$/i;

export const routesFormSchema = z.object({
  destination: z.string().min(1, 'Must choose a valid destination.'),
  timeToDestination: z
    .string()
    .min(1, 'Must be a valid time.')
    .regex(timeRegex, 'Time must be in the format hh:mm AM/PM.'),
});
