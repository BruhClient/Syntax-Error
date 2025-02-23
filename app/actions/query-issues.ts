"use server"
import { prisma } from "@/lib/db"

export const queryIssues = async (q : string,take : number) => { 
    try { 
        const issues = await prisma.issue.findMany({ 
            where : { 
                title : { 
                    startsWith : q
                }
            }, 
            take : take, 
            include : { 
                author : true, 
                votes : true, 
                _count : { 
                    select : { 
                        comments : true
                    }
                }
            }
            
        })

        return issues  
    } catch  { 
        return []
    }
}