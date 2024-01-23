'use client'

import { HTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoadingButton } from "./LoadingButton";

interface FormSubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean,
    children: ReactNode,
}

export const FormSubmitButton = ({ children, disabled, ...props }: FormSubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <LoadingButton loading={pending} type="submit"  {...props} />
    )
}
