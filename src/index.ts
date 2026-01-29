import { Bot } from '@/bot'
import { config } from '@/config'

for (const account of config.accounts) {
  const bot = new Bot({
    username: account.username,
    password: account.password,
    online: account.online,
    games: account.games,
  })

  await bot.login()
}
