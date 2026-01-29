import { z } from 'zod'

export const configSchema = z.object({
  steamData: z.string().min(1),
  tokens: z.string().min(1),
  accounts: z.array(
    z.object({
      username: z
        .string()
        .min(1)
        .regex(/^[a-zA-Z0-9_.@]+$/),
      password: z.string().min(1),
      games: z.array(z.number().int().positive()).min(1).max(32),
      online: z.boolean().default(false).optional(),
    }),
  ),
})

export type Config = z.infer<typeof configSchema>
