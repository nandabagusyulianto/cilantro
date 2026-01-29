import { mkdirSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { join } from 'path'

import { config } from '@/config'
import { convertRelativePath } from '@/utils/path'

export interface TokenStore {
  get(key: string): Promise<string | undefined>
  set(key: string, token: string): Promise<void>
  del(key: string): Promise<void>
}

export class TokenStorage implements TokenStore {
  private readonly dir = convertRelativePath(config.tokens)

  constructor() {
    mkdirSync(this.dir, { recursive: true })
  }

  async get(key: string): Promise<string | undefined> {
    try {
      const text = await Bun.file(this.path(key)).text()
      return text.trim() || undefined
    } catch {
      return undefined
    }
  }

  async set(key: string, token: string): Promise<void> {
    await Bun.write(this.path(key), token)
  }

  async del(key: string): Promise<void> {
    await rm(this.path(key), { force: true })
  }

  private path(key: string): string {
    return join(this.dir, encodeURIComponent(key))
  }
}
