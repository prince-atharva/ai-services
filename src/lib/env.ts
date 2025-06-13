import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'), 
  JWT_SECRET: z.string().min(1),
  GOOGLE_AI_API_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema> 