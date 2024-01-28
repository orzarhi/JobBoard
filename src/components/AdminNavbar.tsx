'use client'

import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export const AdminNavbar = () => {
    const { user, signOut } = useClerk()

    const router = useRouter()

    return (
        <div className="px-3">
            AdminNavbar
        </div>
    )
}
