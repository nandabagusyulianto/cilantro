import type { Config } from '@/schema/config.schema'

const config: Config = {
  steamData: './.steam',
  tokens: './.tokens',
  accounts: [
    {
      username: Bun.env.STEAM_ACCOUNT_USERNAME!,
      password: Bun.env.STEAM_ACCOUNT_PASSWORD!,
      games: [730],
    },
  ],
}

export { config }
