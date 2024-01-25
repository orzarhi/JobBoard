'use server'

import { redirect } from "next/navigation"
import { jobFilterSchema } from "./validation/jobFilter"
import { createJobSchema } from "./validation/createJob"
import { toSlug } from "./utils"
import { nanoid } from 'nanoid'
import { put } from '@vercel/blob'
import path, { parse } from "path"
import prisma from "./prisma"

export const filterJobs = async (formData: FormData) => {

    const values = Object.fromEntries(formData.entries())

    const { q, type, location, remote } = jobFilterSchema.parse(values)

    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }),
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: 'true' })
    })

    redirect(`/?${searchParams.toString()}`)

}

export const createJobPosting = async (formData: FormData) => {

    const values = Object.fromEntries(formData.entries())

    const {
        title,
        type,
        companyName,
        companyLogo,
        locationType,
        location,
        applicationEmail,
        applicationUrl,
        description,
        salary
    } = createJobSchema.parse(values)

    const slug = `${toSlug(title)}-${nanoid(10)}`

    let companyLogoUrl: string | undefined = undefined

    if (companyLogo) {
        const blob = await put(
            `company-logos/${slug}${path.extname(companyLogo.name)}`,
            companyLogo,
            {
                access: 'public',
                addRandomSuffix: false
            }
        )
        companyLogoUrl = blob.url
    }
    await prisma.job.create({
        data: {
            slug,
            title: title.trim(),
            type,
            companyName: companyName.trim(),
            companyLogoUrl,
            locationType,
            location,
            applicationEmail: applicationEmail?.trim(),
            applicationUrl: applicationUrl?.trim(),
            description: description?.trim(),
            salary: parseInt(salary),
        }
    })

    redirect(`/job-submitted`)
}