import { z } from 'zod'
import { jobTypes } from '../job-types'

const requiredString = z.string().min(1, 'Required');
const numericRequiredString = requiredString.regex(/^\d+$/, 'Must be a number')

const companyLogoSchema = z.custom<File | undefined>().refine((file) => {
    !file || (file instanceof File && file.type.startsWith('image/'))
}, 'Must be an image file').refine((file) => {
    return !file || file.size < 1024 * 1024 * 2
}, 'File must be less than 2MB')

export const createJobSchema = z.object({
    title: requiredString.max(100, 'Must be 100 characters or less'),
    type: requiredString.refine((value) => jobTypes.includes(value), 'Invalid job type'),
    companyName: requiredString.max(100, 'Must be 100 characters or less'),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString
})

export type CreateJobValues = z.infer<typeof createJobSchema>