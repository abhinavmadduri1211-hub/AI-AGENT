import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Singleton pattern for Genkit to prevent memory leaks and MaxListenersExceededWarning
 * during Next.js development HMR (Hot Module Replacement).
 */
const globalForAi = global as unknown as {
  ai: ReturnType<typeof genkit>;
};

export const ai =
  globalForAi.ai ||
  genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });

if (process.env.NODE_ENV !== 'production') {
  globalForAi.ai = ai;
  // Increase max listeners for the process in development to accommodate multiple service watchers
  process.setMaxListeners(20);
}
