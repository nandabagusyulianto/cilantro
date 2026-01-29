import { mkdirSync } from 'fs'
import { unlink } from 'fs/promises'
import { join } from 'path'

import { convertRelativePath } from '@/utils/path'

export interface TokenStorage {
  get(key: string): Promise<string | null>
  set(key: string, token: string): Promise<void>
  del(key: string): Promise<void>
}

export class TokenStorage implements TokenStorage {
  private readonly directory = convertRelativePath('./.tokens')

  constructor() {
    mkdirSync(this.directory, { recursive: true })
  }

  private getPath(key: string): string {
    return join(this.directory, key)
  }

  async get(key: string): Promise<string | null> {
    const file = Bun.file(this.getPath(key))
    if (!(await file.exists())) return null

    const token = await file.text()
    return token.trim() || null
  }

  async set(key: string, token: string): Promise<void> {
    await Bun.write(this.getPath(key), token)
  }

  async del(key: string): Promise<void> {
    await unlink(this.getPath(key))
  }
}
