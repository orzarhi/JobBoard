import React, { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import { AdminNavbar } from '@/components/AdminNavbar'

export const metadata: Metadata = {
    title: 'Admin',

}


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <AdminNavbar />
            {children}
        </ClerkProvider>
    )
}
