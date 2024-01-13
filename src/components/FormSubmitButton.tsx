'use client'

import { HTMLAttributes, ReactNode } from "react"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean,
    children: ReactNode,
}

export const FormSubmitButton = ({ children, disabled, ...props }: FormSubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={disabled || pending} {...props}>
            <span className="flex items-center justify-center gap-1">
                {pending && <Loader2 size={16} className="animate-spin" />}
                {children}
            </span>
        </Button>
    )
}
