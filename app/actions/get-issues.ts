"use server"
import { prisma } from "@/lib/db"

export const getIssues = async (skip : number , take:number) => { 
    try { 
        const issues = await prisma.issue.findMany({ 
            skip : skip, 
            take : take, 
            orderBy : { 
                createdAt : "desc"
            },
            include : { 
                _count : { 
                    select : { 
                        comments : true
                    }
                },
                author : true, 
                votes : true , 
            }
        })

        return issues  
    } catch  { 
        return []
    }
}