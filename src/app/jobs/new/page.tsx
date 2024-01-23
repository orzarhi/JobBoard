import { NewJobForm } from "@/components/NewJobForm"
import { Metadata } from "next"

export const metaData: Metadata = {
    title: 'Post a new job',
}

export default function page() {
    return <NewJobForm />
}
