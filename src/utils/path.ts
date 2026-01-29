import { isAbsolute, resolve } from 'path'

export function convertRelativePath(path: string): string {
  return isAbsolute(path) ? path : resolve(process.cwd(), path)
}
