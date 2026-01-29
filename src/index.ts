import { Bot } from '@/bot'
import { config } from '@/config'

const bots = await Promise.all(
  config.accounts.map(async (acc) => {
    const bot = new Bot(acc)
    await bot.start()
    return bot
  }),
)

process.on('SIGINT', async () => {
  await Promise.all(bots.map((b) => b.stop()))
  process.exit(0)
})
