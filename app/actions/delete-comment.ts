"use server"

import { prisma } from "@/lib/db"

 

export const deleteComment = async (commentId : string) => { 

    try { 
        
        await prisma.comment.delete({ 
            where : { 
                id : commentId
            }
        })

        return { 
            success : "Comment has been deleted "
        }


        

    } catch { 
        
        return {
            error : "Something went wrong"
        }
    }
}