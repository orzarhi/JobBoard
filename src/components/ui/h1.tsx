import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string
}

export const H1 = ({ className, ...props }: H1Props) => {
    return (
        <h1
            className={cn('text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
            {...props}
        />
    )
}
