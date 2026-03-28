interface RetryOptions {
  retries?: number;
  delayMs?: number;
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export async function withRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const retries = options.retries ?? 2;
  const delayMs = options.delayMs ?? 500;

  let latestError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      latestError = error;
      if (attempt < retries) {
        await wait(delayMs * (attempt + 1));
      }
    }
  }

  throw latestError;
}
