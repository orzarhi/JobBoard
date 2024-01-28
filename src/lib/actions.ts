'use server'

import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'
import path from "path"
import prisma from "./prisma"
import { createJobSchema } from "./validation/createJob"
import { jobFilterSchema } from "./validation/jobFilter"
import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { isAdmin, toSlug } from "@/lib/utils"
import { redirect } from "next/navigation"
import { del } from "@vercel/blob"

type FormState = { error?: string } | undefined

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

export const approveSubmission = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const jobId = parseInt(formData.get('jobId') as string)

        const user = await currentUser()

        if (!user || !isAdmin(user)) {
            throw new Error('Not authorized')
        }


        await prisma.job.update({
            where: { id: jobId },
            data: { approved: true }
        })

        revalidatePath('/')
    } catch (error) {
        let message = 'Unexpected error'
        if (error instanceof Error) {
            message = error.message
        }
        return { error: message }
    }
}

export const deleteJob = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        const jobId = parseInt(formData.get('jobId') as string)

        const user = await currentUser()
        if (!user || !isAdmin(user)) {
            throw new Error('Not authorized')
        }

        const job = await prisma.job.findUnique({
            where: { id: jobId }
        })

        if (job?.companyLogoUrl) {
            await del(job.companyLogoUrl)
        }

        await prisma.job.delete({
            where: { id: jobId }
        })

        revalidatePath('/')
    } catch (error) {
        let message = 'Unexpected error'
        if (error instanceof Error) {
            message = error.message
        }
        return { error: message }
    }

    redirect('/admin')
}