import { JobFilterSidebar } from '@/components/JobFilterSidebar'
import { JobResults } from '@/components/JobResults'
import { H1 } from '@/components/ui/h1'
import { JobFilterValues } from '@/lib/validation/jobFilter'
import { Metadata } from 'next'

interface HomeProps {
  searchParams: {
    q?: string,
    type?: string,
    location?: string,
    remote?: string,
    page?: string,
  }
}

const getTitle = ({ q, type, location, remote }: JobFilterValues) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? 'Remote developer jobs'
        : 'All developer jobs'

  const titleSuffix = location ? ` in ${location}` : ''

  return `${titlePrefix}${titleSuffix}`
}

export const generateMetadata = ({ searchParams: { q, type, location, remote } }: HomeProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === 'true',
    })} | Flow Jobs`
  }
}

export default async function Home({ searchParams: { q, type, location, remote, page } }: HomeProps) {

  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true',
  }

  return (
    <main className='max-w-5xl m-auto px-3 my-10 space-y-10'>
      <div className='space-y-5 text-center'>
        <H1>{getTitle(filterValues)}</H1>
        <p className='text-muted-foreground'>Find your dream job.</p>
      </div>
      <section className='flex flex-col md:flex-row gap-4'>
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  )
}
