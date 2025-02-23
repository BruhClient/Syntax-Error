"use client"

import { useSession } from "next-auth/react"

export const useSessionUser = () => { 
    const {data : session} = useSession()


    return session?.user
}