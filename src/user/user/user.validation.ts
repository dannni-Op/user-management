import { z, ZodSchema } from 'zod';

export class UserValidation {

  static readonly CREATE: ZodSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255).email(),
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
  })

  static readonly LOGIN: ZodSchema = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
  })

  static readonly UPDATE: ZodSchema = z.object({
    username: z.string().min(1).max(255).optional(),
    password: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    email: z.string().min(1).max(255).email().optional(),
  })
}
