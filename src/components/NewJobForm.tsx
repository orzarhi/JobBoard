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
import { Label } from './ui/label'
import { RichTextEditor } from './RichTextEditor'
import { draftToMarkdown } from 'markdown-draft-js'
import { LoadingButton } from './LoadingButton'

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
                                            <Select {...field} defaultValue=''
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    if (e.currentTarget.value === 'Remote') {
                                                        trigger('location')
                                                    }
                                                }}
                                            >
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
                            <div className='space-y-2'>
                                <Label htmlFor='applicationEmail'>How to apply</Label>
                                <div className='flex justify-between '>
                                    <FormField
                                        control={control}
                                        name='applicationEmail'
                                        render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormControl>
                                                    <div className='flex items-center'>
                                                        <Input
                                                            id='applicationEmail'
                                                            placeholder='Email'
                                                            type='email'
                                                            {...field}
                                                        />
                                                        <span className='mx-2'>or</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name='applicationUrl'
                                        render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Website'
                                                        type='url'
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                            trigger('applicationEmail')
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <Label
                                            onClick={() => setFocus('description')}
                                        >Description</Label>
                                        <FormControl>
                                            <RichTextEditor
                                                onChange={draft => field.onChange(draftToMarkdown(draft))}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='salary'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary</FormLabel>
                                        <FormControl>
                                            <Input type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton type='submit' loading={isSubmitting}>
                                Submit
                            </LoadingButton>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    )
}
