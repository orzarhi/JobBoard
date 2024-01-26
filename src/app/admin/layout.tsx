import React, { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin',

}


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>{children}</ClerkProvider>
    )
}
