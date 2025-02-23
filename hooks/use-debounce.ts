"use client"

import { useEffect, useState } from "react"

export const useDebounce = (input : string,delay=500)  => { 
    const [debounceValue,setDebounceValue] = useState(input)

    useEffect(() => { 
        const timer = setTimeout(()=> {
            setDebounceValue(input)
        },delay)

        return () => { 
            clearTimeout(timer)
        }
    },[input])


    return debounceValue
}