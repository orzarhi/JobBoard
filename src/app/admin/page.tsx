import React from 'react'
import prisma from '@/lib/prisma'
import { H1 } from '@/components/ui/h1'
import Link from 'next/link'
import { JobListItem } from '@/components/JobListItem'

export default async function page() {

    const unapprovedJobs = await prisma.job.findMany({
        where: {
            approved: false
        }
    })


    return (
        <main className='m-auto my-10 max-w-5xl space-y-10 px-3'>
            <H1 className='text-center'>Admin Dashboard</H1>
            <section className='flex flex-col gap-3'>
                <h2 className='text-lg font-bold'>Unapproved jobs:</h2>
                {unapprovedJobs.map((job) => (
                    <Link href={`/admin/jobs/${job.slug}`} key={job.id} className='block'>
                        <JobListItem job={job} />
                    </Link>
                ))}
                {!unapprovedJobs.length ? (
                    <p className='text-muted-foreground'>
                        No unapproved jobs found.
                    </p>
                ) : null}
            </section>
        </main>
    )
}
