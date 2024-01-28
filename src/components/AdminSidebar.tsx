'use client'

import { Job } from '@prisma/client'
import React from 'react'
import { FormSubmitButton } from './FormSubmitButton'
import { useFormState } from 'react-dom'
import { approveSubmission, deleteJob } from '@/lib/actions'

interface AdminSidebarProps {
    job: Job
}

export const AdminSidebar = ({ job }: AdminSidebarProps) => {
    return (
        <aside className='flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch'>
            {job.approved ? (
                <span className='text-center font-semibold text-green-500'>
                    Approved
                </span>
            ) : (
                <ApproveSubmissionButton jobId={job.id} />
            )}
            <DeleteJobButton jobId={job.id} />
        </aside>
    )
}

interface AdminButtonProps {
    jobId: number
}

const ApproveSubmissionButton = ({ jobId }: AdminButtonProps) => {
    const [formState, formAction] = useFormState(approveSubmission, undefined)

    return (
        <form action={formAction} className='space-y-1'>
            <input hidden name='jobId' value={jobId} onChange={() => { }} />
            <FormSubmitButton className='w-full bg-green-500 hover:bg-green-600'>
                Approve
            </FormSubmitButton>
            {formState?.error && (
                <p className='text-red-500 text-sm'> {formState?.error}</p>
            )}
        </form>
    )
}

const DeleteJobButton = ({ jobId }: AdminButtonProps) => {
    const [formState, formAction] = useFormState(deleteJob, undefined)

    return (
        <form action={formAction} className='space-y-1'>
            <input hidden name='jobId' value={jobId} onChange={() => { }} />
            <FormSubmitButton className='w-full bg-red-500 hover:bg-red-600'>
                Delete
            </FormSubmitButton>
            {formState?.error && (
                <p className='text-red-500 text-sm'> {formState?.error}</p>
            )}
        </form>
    )
}