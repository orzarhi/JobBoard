import React, { ReactNode } from 'react'

interface BadgeProps {
    children: ReactNode
}

export const Badge = ({ children }: BadgeProps) => {
    return (
        <span className='border rounded px-2 py-0.5 bg-muted text-muted-foreground text-sm font-medium'>
            {children}
        </span>
    )
}
