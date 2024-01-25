import { NewJobForm } from "@/components/NewJobForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Post a new job',
}

export default function page() {
    return <NewJobForm />
}
