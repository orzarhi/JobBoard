import { jobTypes } from '@/lib/job-types'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import prisma from '@/lib/prisma'
import { Button } from './ui/button'
import { JobFilterValues, jobFilterSchema } from '@/lib/validation/jobFilter'
import { redirect } from 'next/navigation'
import { FormSubmitButton } from './FormSubmitButton'

const filterJobs = async (formData: FormData) => {
    'use server'

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

interface JobFilterSidebarProps {
    defaultValues: JobFilterValues
}

export const JobFilterSidebar = async ({ defaultValues }: JobFilterSidebarProps) => {
    const distinctLocations = (await prisma.job.findMany({
        where: { approved: true },
        select: { location: true },
        distinct: ['location']
    }).then(locations => locations.map(({ location }) => location).filter(Boolean))) as string[]

    return (
        <aside className='md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg' >
            <form action={filterJobs}>
                <div className='space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='q'>Search</Label>
                        <Input
                            id='q'
                            name='q'
                            placeholder='Title, company, etc.'
                            defaultValue={defaultValues.q}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='type'>Type</Label>
                        <Select
                            id='type'
                            name='type'
                            placeholder='type'
                            defaultValue={defaultValues.type || ''}
                        >
                            <option value=''>All types</option>
                            {jobTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='location'>Location</Label>
                        <Select
                            id='location'
                            name='location'
                            placeholder='Location'
                            defaultValue={defaultValues.location || ''}>
                            <option value=''>All locations</option>
                            {distinctLocations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            name='remote'
                            id='remote'
                            className='scale-125 accent-black'
                            defaultChecked={defaultValues.remote}
                        />
                        <Label htmlFor='remote'>Remote jobs</Label>
                    </div>
                    <FormSubmitButton className='w-full'>
                        Filter jobs
                    </FormSubmitButton>
                </div>
            </form>
        </aside>
    )
}
