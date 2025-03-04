import { UserRole } from "@prisma/client"
import { DefaultSession } from "next-auth"

export type  ExtendedUser = DefaultSession["user"] & { 
    role : UserRole, 
    id : string,
    username : string,
    image : string, 
    isPremium : boolean
    
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}