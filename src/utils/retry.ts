interface RetryOptions {
  attempts: number
  delayMs: number
  factor: number
  onRetry?: (attempt: number, delayMs: number) => void
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  for (let i = 1; i <= options.attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === options.attempts) throw err

      const delay = options.delayMs * options.factor ** (i - 1)
      options.onRetry?.(i, delay)
      await Bun.sleep(delay)
    }
  }

  throw new Error('Unreachable')
}
