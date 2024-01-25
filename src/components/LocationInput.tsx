'use client'

import React, { InputHTMLAttributes, forwardRef, useMemo, useState } from 'react'
import { Input } from './ui/input'
import citiesList from '@/lib/cities-list'

interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void

}

export const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(({ onLocationSelected, ...props }, ref) => {
    const [locationSearchInput, setLocationSearchInput] = useState<string>('')
    const [hasFocus, setHasFocus] = useState<boolean>(false)

    const cities = useMemo(() => {
        if (!locationSearchInput.trim()) return [];

        const searchWords = locationSearchInput.split(' ')

        return citiesList.map((city) => `${city.name} ${city.subcountry} ${city.country}`)
            .filter((city) => city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
                searchWords.every((word) => city.toLowerCase().includes(word.toLowerCase()))).slice(0, 5)

    }, [locationSearchInput])

    return (
        <div className='relative'>
            <Input
                autoComplete='off'
                placeholder='Search for a city'
                type='search'
                value={locationSearchInput}
                onChange={({ target }) => setLocationSearchInput(target.value)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                {...props}
                ref={ref} />
            {locationSearchInput.trim() && hasFocus && (
                <div className='absolute z-20 divide-y bg-background shadow-xl border-x border-b round-b-lg'>
                    {!cities.length ? <p className='p-3'>No results found</p> : null}
                    {cities.map((city) => (
                        <button
                            key={city}
                            className='block w-full text-start p-2'
                            onMouseDown={(e) => {
                                e.preventDefault()
                                onLocationSelected(city)
                                setLocationSearchInput('')
                            }}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
})

LocationInput.displayName = 'LocationInput'
