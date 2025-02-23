"use server"
import { prisma } from "@/lib/db"

export const asignSolved = async (issueId : string,value : boolean) => { 
    try { 
        await prisma.issue.update({ 
            where : {
                id : issueId
            }, 
            data : { 
                isSolved : value
            }
        })
        if (value) { 
            return {
                success : `Marked Issue with #${issueId} as solved`
            }  
        } else { 
            return {
                success : `Issue #${issueId} is now unanswered`
            }  
        }

        
    } catch  { 
        return {
            error : "Something went wrong"
        }
    }
}