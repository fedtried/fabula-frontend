import * as z from "zod"

export const registerFormSchema = z.object({
    name: z.string().min(2, {message: "Username must be at least 2 characters."}),
    email: z.string().email(),
    password: z.string().min(2, {message: 'Password must be at least 8 characters.'})
})

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2)
})

export const storyFormSchema = z.object({
    writing: z.string(),
    share: z.boolean().default(false)
})

export const updateProfileFormSchema = z.object({
    name: z.string().min(2, {message: "Username must be at least 2 characters."}),
    email: z.string().email(),
    currentPassword: z.string().min(2, {message: 'Password must be at least 8 characters.'}),
    newPassword: z.string().optional()
})