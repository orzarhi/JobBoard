import { H1 } from '@/components/ui/h1'
import React from 'react'

export default function page() {
    return (
        <main className='m-auto max-w-5xl my-10 space-y-5 px-3 text-center'>
            <H1>Job Submitted</H1>
            <p className='text-lg'>
                Your job posting has been submitted and is now pending approval.
            </p>
        </main>
    )
}
