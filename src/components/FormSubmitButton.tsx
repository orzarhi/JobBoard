'use client'

import { HTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoadingButton } from "./LoadingButton";

interface FormSubmitButtonProps extends HTMLAttributes<HTMLButtonElement> {

}
export const FormSubmitButton = ({ ...props }: FormSubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <LoadingButton {...props} loading={pending} type="submit" />
    )
}
