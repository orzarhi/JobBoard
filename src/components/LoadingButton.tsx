import { ButtonHTMLAttributes, ReactNode } from "react"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
}
export const LoadingButton = ({ children, loading, disabled, ...props }: LoadingButtonProps) => {
    return (
        <Button disabled={disabled || loading} {...props}>
            <span className="flex items-center justify-center gap-1">
                {loading && <Loader2 size={16} className="animate-spin" />}
                {children}
            </span>
        </Button>
    )
}
