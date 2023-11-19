/**
 * Delays the execution of code for a specified duration.
 * Security-relevant: Prevents timing attacks by ensuring a minimum delay before returning.
 * @param {number} [ms=100] - The desired delay in milliseconds (optional).
 * @returns {Promise<void>} - A promise representing the delay.
 */
export const delay = (ms: number = 100): Promise<void> => {
  const minimumDelay = 100; // Minimum delay in milliseconds
  const actualDelay = Math.max(minimumDelay, ms); // Uses the maximum between the specified delay and the minimum value

  const randomDelay = Math.floor(Math.random() * 500);
  // Combines the minimum delay with an additional random value
  const totalDelay = actualDelay + randomDelay;

  return new Promise((resolve) => setTimeout(resolve, totalDelay));
};
