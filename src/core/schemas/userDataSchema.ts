import z from 'zod'

const usernameSchema = z.string('username')
// const planSchema = z.object({
//   description: z.enum(['free', 'tier1', 'tier2', 'tier3']),
//   createdAt: z.date().max(new Date()),
// })
export const UserSettingsSchema = z.object({
  name: z.string({ error: 'Nome não encontrado' }),
  username: usernameSchema,
})
