"use server"
import { prisma } from "@/lib/db"

export const getComments = async (skip : number , take:number) => { 
    try { 
        const comments = await prisma.comment.findMany({ 
            skip : skip, 
            take : take, 
            orderBy : { 
                createdAt : "desc"
            },
            include : { 
                _count : { 
                    select : { 
                        replies : true
                    }
                },
                author : true, 
                votes : true , 
            }
        })

        return comments  
    } catch  { 
        return []
    }
}