"use server"
import { prisma } from "@/lib/db"

export const getCommentReplies = async (skip : number , take:number,commentId : string ) => { 
    try { 
        const commentReply = await prisma.commentReply.findMany({ 
            where : { 
                commentId : commentId
            },
            skip : skip, 
            take : take, 
            orderBy : { 
                createdAt : "desc"
            },
            include : { 
                
                author : true, 
                likes : true
               
               
            }
        })

        return commentReply  
    } catch  { 
        return []
    }
}