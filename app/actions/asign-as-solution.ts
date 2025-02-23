"use server"
import { prisma } from "@/lib/db"

export const asignSolution = async (commentId : string,value : boolean) => { 
    try { 
        await prisma.comment.update({ 
            where : {
                id : commentId
            }, 
            data : { 
                isSolution : value
            }
        })
        if (value) { 
            return {
                success : `Marked comment with #${commentId} as solution`
            }  
        } else { 
            return {
                success : `Comment #${commentId} is no longer a solution`
            }  
        }

        
    } catch  { 
        return {
            error : "Something went wrong"
        }
    }
}