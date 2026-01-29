interface RetryOptions {
  attempts: number
  delayMs: number
  factor: number
  onRetry?: (attempt: number, delay: number) => void
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  { attempts, delayMs, factor, onRetry }: RetryOptions,
): Promise<T> {
  for (let i = 0; ; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i >= attempts - 1) throw err

      const delay = delayMs * factor ** i
      onRetry?.(i + 1, delay)
      await Bun.sleep(delay)
    }
  }
}
