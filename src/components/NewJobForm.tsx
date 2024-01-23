'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { H1 } from './ui/h1'
import { CreateJobValues, createJobSchema } from '@/lib/validation/createJob'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { jobTypes, locationTypes } from '@/lib/job-types'
import { LocationInput } from './LocationInput'
import { X } from 'lucide-react'

export const NewJobForm = () => {
    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema)
    })

    const { handleSubmit, watch, trigger, control, setValue, setFocus, formState: { isSubmitting } } = form

    const onSubmit = (values: CreateJobValues) => {
        console.log(values)
    }

    return (
        <main className='max-w-3xl m-auto my-10 space-y-10'>
            <div className='space-y-5 text-center'>
                <H1 className=''>Find your perfect developer</H1>
                <p className='text-muted-foreground'>Get your job posting seen by thousands of job seekers.</p>
            </div>
            <div className='space-y-6 border rounded-lg p-4'>
                <div className=''>
                    <h2 className='font-semibold'>Job details</h2>
                    <p className='text-muted-foreground'>
                        Provide a job description and details.
                    </p>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
                            <FormField
                                control={control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='e.g. Frontend Developer' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job type</FormLabel>
                                        <FormControl>
                                            <Select {...field} defaultValue=''>
                                                <option value='' hidden>
                                                    Select an option
                                                </option>
                                                {jobTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='companyName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='companyLogo'
                                render={({ field: { value, ...fieldValues } }) => (
                                    <FormItem>
                                        <FormLabel>Company logo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...fieldValues}
                                                type='file'
                                                accept='image/*'
                                                onChange={({ target }) => {
                                                    const file = target.files?.[0]
                                                    fieldValues.onChange(file)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='locationType'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Select {...field} defaultValue=''>
                                                <option value='' hidden>
                                                    Select an option
                                                </option>
                                                {locationTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='location'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Office location</FormLabel>
                                        <FormControl>
                                            <LocationInput
                                                onLocationSelected={field.onChange}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                        {watch('location') && (
                                            <div className='flex items-center gap-1'>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setValue('location', '', { shouldValidate: true })

                                                    }}
                                                >
                                                    <X size={20} />
                                                </button>
                                                <p className='text-sm'>{watch('location')}</p>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}
