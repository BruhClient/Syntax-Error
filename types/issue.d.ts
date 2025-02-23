import { User } from "@prisma/client"

export type ExtendedIssue = Issue & { 
    _count : { 
        comments : number
    }, 
    author : User

}