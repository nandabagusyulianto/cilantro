import { isAbsolute, join, resolve } from 'path'

import { packageDirectorySync } from 'pkg-dir'

export function convertRelativePath(path: string) {
  if (isAbsolute(path)) {
    return path
  }

  const root = packageDirectorySync({ cwd: __dirname })

  if (!root) {
    throw new Error('Can not find root directory of the app.')
  }

  return resolve(join(root, path))
}
