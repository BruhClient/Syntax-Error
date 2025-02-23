"use server"

import { prisma } from "@/lib/db"

 

export const deleteCommentReply = async (id : string) => { 

    try { 
        
        await prisma.commentReply.delete({ 
            where : { 
                id : id
            }
        })

        return { 
            success : "Reply has been deleted "
        }


        

    } catch { 
        
        return {
            error : "Something went wrong"
        }
    }
}