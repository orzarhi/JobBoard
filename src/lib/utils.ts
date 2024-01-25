import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)

export const relativeDate = (from: Date) =>
    formatDistanceToNowStrict(from, { addSuffix: true })

export const toSlug = (str: string) => str.toLocaleLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')