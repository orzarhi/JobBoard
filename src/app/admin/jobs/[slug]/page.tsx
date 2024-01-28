import React from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { JobDetails } from '@/components/JobDetails'
import { AdminSidebar } from '@/components/AdminSidebar'

interface PageProps {
    params: { slug: string }
}

export default async function page({ params: { slug } }: PageProps) {

    const job = await prisma.job.findUnique({
        where: { slug }
    })

    if (!job) notFound()

    return (
        <main className='flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start'>
            <JobDetails job={job} />
            <AdminSidebar job={job} />
        </main>
    )
}
